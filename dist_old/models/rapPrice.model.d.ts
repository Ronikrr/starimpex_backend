import { Schema } from 'mongoose';
export declare class RapPrice {
    _id: Schema.Types.ObjectId;
    shape: string;
    lowSize: number;
    highSize: number;
    color: string;
    clarity: string;
    price: number;
    rapDate: string;
    createdAt?: string;
}
export declare const RapPriceModel: import("@typegoose/typegoose").ReturnModelType<typeof RapPrice, import("@typegoose/typegoose/lib/types").BeAnObject>;
