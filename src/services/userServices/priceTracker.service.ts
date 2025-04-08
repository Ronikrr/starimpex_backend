import { AddToPriceTrackerDto, GetPriceTrackListDto, RemoveFromPriceTrackerDto } from '@/dtos/userDtos/priceTracker.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DiamondModel } from '@/models/diamonds.model';
import { PriceTracker, PriceTrackerModel } from '@/models/priceTracker.model';
import { UserDiamondNotesModel } from '@/models/userDiamondNotes.model';
import { User } from '@/models/users.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { filterDiamond, filterPriceTrackerProjection } from '@/utils/filters/userFilters';
import { Types } from 'mongoose';
import { Service } from 'typedi';
import NotificationService from '../adminServices/notification.service';
import { AdminSettingsModel } from '@/models/adminSettings.model';
import { ENotificationType, INotification } from '@/interfaces/adminInterfaces/notification.interface';
import { UserPriceTrackHistoryModel } from '@/models/userPriceTrackHistory.model';

async function userAddToPriceTrackerActionNotification(count: number, user: User) {
  const notificationService = new NotificationService();

  const fcmToken = (await AdminSettingsModel.findOne())?.fcmTokens || [];

  const notification: INotification = {
    title: 'New Items Added To Price Track',
    body: `${user.fullName} has added ${count} ${count > 1 ? 'items' : 'item'} to price track`,
    type: ENotificationType.USER_ADD_TO_PRICE_TRACK_ACTION,
    url: '/admin/price-track',
  };
  await notificationService.createNotification(notification, fcmToken);
}

@Service()
export class PriceTrackerService {
  public async addToPriceTracker(data: AddToPriceTrackerDto, user: User) {
    const findDiamonds = await DiamondModel.find({ _id: { $in: data.diamondIds }, isDeleted: false });

    if (findDiamonds.length !== data.diamondIds.length) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PRICE_TRACKER_ITEMS_SOLD_OUT_ERROR);
    }

    const promiseArray = [];
    const stoneNoArray = [];
    for (const diamond of findDiamonds) {
      stoneNoArray.push(diamond.stoneNo);
      promiseArray.push(
        PriceTrackerModel.findOneAndUpdate(
          { user: user._id, 'diamondSnapshot.uniqueStoneId': diamond.uniqueStoneId },
          {
            $set: {
              user: user._id,
              diamondSnapshot: diamond.toObject(),
            },
          },
          { upsert: true, new: true },
        ),
      );
    }
    await Promise.allSettled(promiseArray);
    await UserPriceTrackHistoryModel.create({ user: user._id, stoneNos: stoneNoArray.join(',') });
    userAddToPriceTrackerActionNotification(stoneNoArray.length, user);
  }

  public async getPriceTrackList(
    getData: GetPriceTrackListDto,
    user: User,
  ): Promise<{ totalTrackItems: number; totalPages: number; priceTrackList: PriceTracker[] }> {
    const totalCount = await PriceTrackerModel.countDocuments({ user: user._id });

    if (!totalCount) {
      return {
        totalTrackItems: 0,
        totalPages: 0,
        priceTrackList: [],
      };
    }

    const priceTrack = await PriceTrackerModel.find({ user: user._id }, filterPriceTrackerProjection)
      .sort({ updatedAt: -1 })
      .skip(getData.skip)
      .limit(getData.limit);
    const diamondUniqueIds = priceTrack.map(item => item.diamondSnapshot['uniqueStoneId']);
    const diamonds = await DiamondModel.find({ uniqueStoneId: { $in: diamondUniqueIds } });
    const notesList = await UserDiamondNotesModel.find({ user: user._id, uniqueStoneId: { $in: diamondUniqueIds } });

    const priceTrackList: any = priceTrack.map(item => {
      const findNote = notesList.find(data => data.uniqueStoneId === item.diamondSnapshot['uniqueStoneId'])?.notes || '';
      const findDiamond = diamonds.find(diamond => diamond.uniqueStoneId === item.diamondSnapshot['uniqueStoneId']);
      return {
        ...item.toObject(),
        diamondSnapshot: { ...filterDiamond(item.diamondSnapshot), userNotes: findNote },
        diamond: findDiamond ? filterDiamond(findDiamond) : null,
      };
    });

    return {
      totalTrackItems: totalCount,
      totalPages: Math.ceil(totalCount / getData.limit),
      priceTrackList,
    };
  }

  public async removeFromPriceTracker(data: RemoveFromPriceTrackerDto, user: User) {
    const diamondIds = data.diamondIds.map(id => new Types.ObjectId(id));
    await PriceTrackerModel.deleteMany({ user: user._id, 'diamondSnapshot._id': { $in: diamondIds } });
  }
}
