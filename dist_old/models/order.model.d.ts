import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { IOrderAdditionalCharge, IOrderItem } from '../interfaces/order.interface';
export declare class Order {
    _id: Schema.Types.ObjectId;
    orderNumber: string;
    items: Array<IOrderItem>;
    remarks: string;
    user: Ref<User>;
    shippingCharge: number;
    additionalCharges: Array<IOrderAdditionalCharge>;
    grossAmount: number;
    totalStones: number;
    totalCarats: number;
    isTermsAccepted: boolean;
    status: string;
    isManualOrder: boolean;
    companyName: string;
    companyEmail: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const OrderModel: import("@typegoose/typegoose").ReturnModelType<typeof Order, import("@typegoose/typegoose/lib/types").BeAnObject>;
