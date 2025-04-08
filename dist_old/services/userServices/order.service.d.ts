import { CreateOrderDto } from '../../dtos/userDtos/order.dto';
import { User } from '../../models/users.model';
export declare class OrderService {
    createOrder(data: CreateOrderDto, user: User): Promise<void>;
}
