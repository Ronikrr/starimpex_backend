import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
export declare class CustomerQuery {
    _id: Schema.Types.ObjectId;
    user: Ref<User>;
    message: string;
    status: string;
}
export declare const CustomerQueryModel: import("@typegoose/typegoose").ReturnModelType<typeof CustomerQuery, import("@typegoose/typegoose/lib/types").BeAnObject>;
