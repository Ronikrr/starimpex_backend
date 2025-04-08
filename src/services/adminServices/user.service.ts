import { ChangeUserStatusDto, GetCartHistoryListDto, GetPriceTrackHistoryListDto, GetUserListDto } from '@/dtos/adminDtos/user.dto';
import { HttpException } from '@/exceptions/HttpException';
import { UserCartHistory, UserCartHistoryModel } from '@/models/userCartHistory.model';
import { UserPriceTrackHistory, UserPriceTrackHistoryModel } from '@/models/userPriceTrackHistory.model';
import { User, UserModel } from '@/models/users.model';
import { CODE_BAD_REQUEST, CODE_NOT_FOUND } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import {
  filterUserBasicDetailsProjection,
  filterUserCartHistoryProjection,
  filterUserPriceTrackHistoryProjection,
  filterUserProjection,
} from '@/utils/filters/adminFilters';
import { hash } from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class UserService {
  public async getUserList(getData: GetUserListDto) {
    const totalCount = await UserModel.countDocuments();
    if (totalCount === 0) {
      return {
        users: [],
        totalPage: 0,
      };
    }

    const users = await UserModel.find({}, filterUserProjection).sort({ updatedAt: -1 }).skip(getData.skip).limit(getData.limit);

    return {
      users,
      totalPage: Math.ceil(totalCount / getData.limit),
    };
  }

  public async changeUserStatus(userId: string, updateData: ChangeUserStatusDto): Promise<User> {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { status: updateData?.status } }, { new: true });

    if (!updatedUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_UPDATE_ERROR);
    }

    return updatedUser;
  }

  public async getUser(userId: string): Promise<User> {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.USER_NOT_FOUND);
    }

    return user;
  }

  public async getUserCartHistory(getData: GetCartHistoryListDto): Promise<{ totalPages: number; cartHistory: UserCartHistory[] }> {
    const findCondition: any = {};
    const fromDate = getData.fromDate ? getData.fromDate : null;
    const toDate = getData.toDate ? getData.toDate : null;
    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    if (fromDate) {
      findCondition.createdAt = { $gte: fromDate };
    }
    if (toDate) {
      if (findCondition.createdAt) {
        findCondition.createdAt.$lte = toDate;
      } else {
        findCondition.createdAt = { $lte: toDate };
      }
    }

    const totalCount = await UserCartHistoryModel.countDocuments(findCondition);

    if (!totalCount || totalCount === 0) {
      return {
        totalPages: 0,
        cartHistory: [],
      };
    }

    const cartHistory = await UserCartHistoryModel.find(findCondition, filterUserCartHistoryProjection)
      .populate('user', filterUserBasicDetailsProjection)
      .sort({ createdAt: -1 })
      .skip(getData.skip)
      .limit(getData.limit);

    return {
      totalPages: Math.ceil(totalCount / getData.limit),
      cartHistory,
    };
  }

  public async getUserPriceTrackHistory(
    getData: GetPriceTrackHistoryListDto,
  ): Promise<{ totalPages: number; priceTrackHistory: UserPriceTrackHistory[] }> {
    const findCondition: any = {};
    const fromDate = getData.fromDate ? getData.fromDate : null;
    const toDate = getData.toDate ? getData.toDate : null;
    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    if (fromDate) {
      findCondition.createdAt = { $gte: fromDate };
    }
    if (toDate) {
      if (findCondition.createdAt) {
        findCondition.createdAt.$lte = toDate;
      } else {
        findCondition.createdAt = { $lte: toDate };
      }
    }

    const totalCount = await UserPriceTrackHistoryModel.countDocuments(findCondition);

    if (!totalCount || totalCount === 0) {
      return {
        totalPages: 0,
        priceTrackHistory: [],
      };
    }

    const priceTrackHistory = await UserPriceTrackHistoryModel.find(findCondition, filterUserPriceTrackHistoryProjection)
      .populate('user', filterUserBasicDetailsProjection)
      .sort({ createdAt: -1 })
      .skip(getData.skip)
      .limit(getData.limit);

    return {
      totalPages: Math.ceil(totalCount / getData.limit),
      priceTrackHistory,
    };
  }

  public async changePassword(userId: string, updateData: User): Promise<User> {
    const hashedPassword = await hash(updateData.password, 10);
    const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { password: hashedPassword } }, { new: true });

    if (!updatedUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.SOMETHING_WENT_WRONG);
    }

    return updatedUser;
  }
}
