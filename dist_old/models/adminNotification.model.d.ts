import { ENotificationType } from '../interfaces/adminInterfaces/notification.interface';
import { Schema } from 'mongoose';
export declare class AdminNotification {
    _id: Schema.Types.ObjectId;
    type: ENotificationType;
    title: string;
    body: string;
    url: string;
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const AdminNotificationModel: import("@typegoose/typegoose").ReturnModelType<typeof AdminNotification, import("@typegoose/typegoose/lib/types").BeAnObject>;
