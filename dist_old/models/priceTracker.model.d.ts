import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
export declare class PriceTracker {
    _id: Schema.Types.ObjectId;
    user: Ref<User>;
    diamondSnapshot: object;
    status: string;
}
export declare const PriceTrackerModel: import("@typegoose/typegoose").ReturnModelType<typeof PriceTracker, import("@typegoose/typegoose/lib/types").BeAnObject>;
