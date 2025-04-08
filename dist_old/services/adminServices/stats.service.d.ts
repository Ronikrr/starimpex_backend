import { GetSearchListDto } from '../../dtos/adminDtos/stats.dto';
import { SearchHistory } from '../../models/searchHistory.model';
export declare class StatsService {
    getDiamondSearchList: (getData: GetSearchListDto) => Promise<{
        searchList: SearchHistory[];
        totalCount: number;
        totalPages: number;
    }>;
}
