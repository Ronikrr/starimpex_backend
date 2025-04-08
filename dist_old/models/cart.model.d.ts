import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { Diamond } from './diamonds.model';
export declare class Cart {
    _id: Schema.Types.ObjectId;
    userId: Ref<User>;
    diamond: Ref<Diamond>;
    diamondSnapshot: object;
    status: string;
}
export declare const CartModel: import("@typegoose/typegoose").ReturnModelType<typeof Cart, import("@typegoose/typegoose/lib/types").BeAnObject>;
