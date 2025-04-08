import { Schema } from 'mongoose';
export declare class Purchase {
    _id: Schema.Types.ObjectId;
    orderId: string;
    date: Date;
    supplierName: string;
    supplierAddress: string;
    description: string;
    items: object[];
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const PurchaseModel: import("@typegoose/typegoose").ReturnModelType<typeof Purchase, import("@typegoose/typegoose/lib/types").BeAnObject>;
