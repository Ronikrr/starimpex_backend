import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
export declare class UserDiamondNotes {
    _id: Schema.Types.ObjectId;
    user: Ref<User>;
    uniqueStoneId: string;
    notes: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserDiamondNotesModel: import("@typegoose/typegoose").ReturnModelType<typeof UserDiamondNotes, import("@typegoose/typegoose/lib/types").BeAnObject>;
