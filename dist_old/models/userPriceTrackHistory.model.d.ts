import { Ref } from '@typegoose/typegoose';
import { User } from './users.model';
export declare class UserPriceTrackHistory {
    stoneNos: string;
    user: Ref<User>;
    createdAt?: Date;
}
export declare const UserPriceTrackHistoryModel: import("@typegoose/typegoose").ReturnModelType<typeof UserPriceTrackHistory, import("@typegoose/typegoose/lib/types").BeAnObject>;
