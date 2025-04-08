/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ChangeOrderStatusDto, CreateManualOrderDto, OrderAdditionChargesDto } from '../../dtos/adminDtos/order.dto';
import { IOrderItem } from '../../interfaces/order.interface';
import { Order } from '../../models/order.model';
export declare class UserOrderService {
    changeOrderStatus(data: ChangeOrderStatusDto, orderId: string): Promise<Order>;
    updateAdditionalCharges(data: OrderAdditionChargesDto, orderId: string): Promise<Order>;
    getOrderItems(orderNumber: string): Promise<Array<IOrderItem>>;
    createOrder(createData: CreateManualOrderDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, Order> & Order & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateOrder(updateData: CreateManualOrderDto, orderId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, Order> & Order & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}
