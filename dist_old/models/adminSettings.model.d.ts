import { Schema } from 'mongoose';
export declare class AdminSettings {
    _id: Schema.Types.ObjectId;
    fcmTokens: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const AdminSettingsModel: import("@typegoose/typegoose").ReturnModelType<typeof AdminSettings, import("@typegoose/typegoose/lib/types").BeAnObject>;
