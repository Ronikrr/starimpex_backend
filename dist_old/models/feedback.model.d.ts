import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
export declare class Feedback {
    _id: Schema.Types.ObjectId;
    user: Ref<User>;
    rating: number;
    comment: string;
}
export declare const FeedbackModel: import("@typegoose/typegoose").ReturnModelType<typeof Feedback, import("@typegoose/typegoose/lib/types").BeAnObject>;
