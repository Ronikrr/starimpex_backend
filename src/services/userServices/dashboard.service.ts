import { EDiamondType } from '@/interfaces/diamonds.interface';
import { DiamondModel } from '@/models/diamonds.model';
import { OrderModel } from '@/models/order.model';
import { PriceTrackerModel } from '@/models/priceTracker.model';
import { SearchHistory, SearchHistoryModel } from '@/models/searchHistory.model';
import { User } from '@/models/users.model';
import { filterSearchHistoryProjection } from '@/utils/filters/userFilters';
import { Service } from 'typedi';

@Service()
export class DashboardService {
  public async getDashboardStats(user: User): Promise<{
    totalNaturalDiamonds: number;
    totalLabGrownDiamonds: number;
    totalOrdersPlaced: number;
    totalPriceTrack: number;
    searchHistory: SearchHistory[];
  }> {
    const totalNaturalDiamonds = await DiamondModel.countDocuments({ diamondType: EDiamondType.NATURAL_DIAMONDS, isDeleted: false });
    const totalLabGrownDiamonds = await DiamondModel.countDocuments({ diamondType: EDiamondType.LAB_GROWN_DIAMONDS, isDeleted: false });
    const totalOrdersPlaced = await OrderModel.countDocuments({ user: user._id });
    const totalPriceTrack = await PriceTrackerModel.countDocuments({ user: user._id });

    const searchHistory = await SearchHistoryModel.find({ user: user._id }, filterSearchHistoryProjection).sort({ createdAt: -1 }).limit(5);

    return {
      totalNaturalDiamonds,
      totalLabGrownDiamonds,
      totalOrdersPlaced,
      totalPriceTrack,
      searchHistory,
    };
  }
}
