import { GetCartItemListDto } from '@/dtos/userDtos/cart.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Cart, CartModel } from '@/models/cart.model';
import { DiamondModel } from '@/models/diamonds.model';
import { UserDiamondNotesModel } from '@/models/userDiamondNotes.model';
import { User } from '@/models/users.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { filterCartProjection, filterDiamond, filterDiamondProjection } from '@/utils/filters/userFilters';
import { Service } from 'typedi';
import NotificationService from '../adminServices/notification.service';
import { AdminSettingsModel } from '@/models/adminSettings.model';
import { ENotificationType, INotification } from '@/interfaces/adminInterfaces/notification.interface';
import { UserCartHistoryModel } from '@/models/userCartHistory.model';

async function userAddToCartActionNotification(count: number, user: User) {
  const notificationService = new NotificationService();

  const fcmToken = (await AdminSettingsModel.findOne())?.fcmTokens || [];

  const notification: INotification = {
    title: 'New Items Added To Cart',
    body: `${user.fullName} has added ${count} ${count > 1 ? 'items' : 'item'} to cart`,
    type: ENotificationType.USER_ADD_TO_CART_ACTION,
    url: '/admin/cart',
  };
  await notificationService.createNotification(notification, fcmToken);
}

@Service()
export class UserCartService {
  public async addToCart(diamondIds: string[], user: User): Promise<{ totalCount: number }> {
    const findDiamonds = await DiamondModel.find({ _id: { $in: diamondIds }, isDeleted: false });

    if (findDiamonds.length !== diamondIds.length) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ITEMS_SOLD_OUT);
    }

    const promiseArray = [];
    const stoneNoArray = [];
    for (const diamond of findDiamonds) {
      stoneNoArray.push(diamond.stoneNo);
      promiseArray.push(
        CartModel.findOneAndUpdate(
          { userId: user._id, diamond: diamond._id },
          {
            $set: {
              userId: user._id,
              diamond: diamond._id,
              diamondSnapshot: diamond.toObject(),
            },
          },
          { upsert: true, new: true },
        ),
      );
    }

    await Promise.allSettled(promiseArray);
    await UserCartHistoryModel.create({ user: user._id, stoneNos: stoneNoArray.join(',') });
    const totalCount = await CartModel.countDocuments({ userId: user._id });
    userAddToCartActionNotification(stoneNoArray.length, user);

    return { totalCount };
  }

  public async deleteCartItem(diamondIds: string[], user: User) {
    await CartModel.deleteMany({ userId: user._id, diamond: { $in: diamondIds } });
  }

  public async getCartItemList(getData: GetCartItemListDto, user: User): Promise<{ totalPieces: number; totalPages: number; cart: Cart[] }> {
    const totalCount = await CartModel.countDocuments({ userId: user._id });

    if (!totalCount) {
      return {
        totalPieces: 0,
        totalPages: 0,
        cart: [],
      };
    }

    const cartItems = await CartModel.find({ userId: user._id }, filterCartProjection)
      .sort({ updatedAt: -1 })
      .populate('diamond', filterDiamondProjection)
      .skip(getData.skip)
      .limit(getData.limit);

    const diamondUniqueIds = cartItems.map(item => item.diamondSnapshot['uniqueStoneId']);
    const notesList = await UserDiamondNotesModel.find({ user: user._id, uniqueStoneId: { $in: diamondUniqueIds } });
    const cart: any = cartItems.map(item => {
      const findNote = notesList.find(data => data.uniqueStoneId === item.diamondSnapshot['uniqueStoneId'])?.notes || '';
      return { ...item.toObject(), diamondSnapshot: { ...filterDiamond(item.diamondSnapshot), userNotes: findNote } };
    });

    return {
      totalPieces: totalCount,
      totalPages: Math.ceil(totalCount / getData.limit),
      cart,
    };
  }
}
