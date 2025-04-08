import { Ref } from '@typegoose/typegoose';
import { User } from './users.model';
export declare class UserCartHistory {
    stoneNos: string;
    user: Ref<User>;
    createdAt?: Date;
}
export declare const UserCartHistoryModel: import("@typegoose/typegoose").ReturnModelType<typeof UserCartHistory, import("@typegoose/typegoose/lib/types").BeAnObject>;
