import { GetOrderListDto } from '../dtos/order.dto';
import { Order } from '../models/order.model';
import { User } from '../models/users.model';
export declare class CommonOrderService {
    getOrderList(getData: GetOrderListDto, user?: User): Promise<{
        totalOrders: number;
        totalPages: number;
        orders: Order[];
    }>;
    getOrderDetails(orderId: string, user?: User): Promise<{
        order: Order;
        totalAmount: number;
        totalAdditionalCharges: number;
    }>;
    exportOrdersExcel(orderIds: Array<string>, user?: User, fromDate?: Date, toDate?: Date): Promise<import("exceljs").Buffer>;
}
