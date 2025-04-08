import { AddDiamondNotes } from '../../dtos/userDtos/diamond.dto';
import { User } from '../../models/users.model';
export declare class UserDiamondService {
    private commonDiamondService;
    addDiamondNotes(data: AddDiamondNotes, user: User): Promise<void>;
    saveDiamondSearch(filters: any, user: User): Promise<void>;
}
