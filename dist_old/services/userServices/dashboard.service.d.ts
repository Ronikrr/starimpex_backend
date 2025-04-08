import { SearchHistory } from '../../models/searchHistory.model';
import { User } from '../../models/users.model';
export declare class DashboardService {
    getDashboardStats(user: User): Promise<{
        totalNaturalDiamonds: number;
        totalLabGrownDiamonds: number;
        totalOrdersPlaced: number;
        totalPriceTrack: number;
        searchHistory: SearchHistory[];
    }>;
}
