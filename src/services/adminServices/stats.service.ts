import { GetSearchListDto } from '@/dtos/adminDtos/stats.dto';
import { SearchHistory, SearchHistoryModel } from '@/models/searchHistory.model';
import { filterUserBasicDetailsProjection } from '@/utils/filters/adminFilters';
import { Service } from 'typedi';

@Service()
export class StatsService {
  public getDiamondSearchList = async (
    getData: GetSearchListDto,
  ): Promise<{ searchList: SearchHistory[]; totalCount: number; totalPages: number }> => {
    const findCondition: any = {};
    const fromDate = getData.fromDate;
    const toDate = getData.toDate;

    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
      findCondition.createdAt = { $gte: fromDate };
    }

    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
      if (findCondition.createdAt) {
        findCondition.createdAt.$lte = toDate;
      } else {
        findCondition.createdAt = { $lte: toDate };
      }
    }

    const totalCount = await SearchHistoryModel.countDocuments(findCondition);

    if (!totalCount || totalCount === 0) {
      return {
        searchList: [],
        totalCount: 0,
        totalPages: 0,
      };
    }

    const searchList = await SearchHistoryModel.find(findCondition)
      .populate('user', filterUserBasicDetailsProjection)
      .sort({ createdAt: -1 })
      .skip(getData.skip)
      .limit(getData.limit);

    return {
      searchList,
      totalCount,
      totalPages: Math.ceil(totalCount / getData.limit),
    };
  };
}
