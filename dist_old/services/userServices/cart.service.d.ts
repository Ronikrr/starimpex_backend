import { GetCartItemListDto } from '../../dtos/userDtos/cart.dto';
import { Cart } from '../../models/cart.model';
import { User } from '../../models/users.model';
export declare class UserCartService {
    addToCart(diamondIds: string[], user: User): Promise<{
        totalCount: number;
    }>;
    deleteCartItem(diamondIds: string[], user: User): Promise<void>;
    getCartItemList(getData: GetCartItemListDto, user: User): Promise<{
        totalPieces: number;
        totalPages: number;
        cart: Cart[];
    }>;
}
