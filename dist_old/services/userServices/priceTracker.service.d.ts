import { AddToPriceTrackerDto, GetPriceTrackListDto, RemoveFromPriceTrackerDto } from '../../dtos/userDtos/priceTracker.dto';
import { PriceTracker } from '../../models/priceTracker.model';
import { User } from '../../models/users.model';
export declare class PriceTrackerService {
    addToPriceTracker(data: AddToPriceTrackerDto, user: User): Promise<void>;
    getPriceTrackList(getData: GetPriceTrackListDto, user: User): Promise<{
        totalTrackItems: number;
        totalPages: number;
        priceTrackList: PriceTracker[];
    }>;
    removeFromPriceTracker(data: RemoveFromPriceTrackerDto, user: User): Promise<void>;
}
