import { ENotificationType } from '@/interfaces/adminInterfaces/notification.interface';
import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@index({ createdAt: -1 })
@modelOptions({ schemaOptions: { collection: 'adminNotifications', timestamps: true } })
export class AdminNotification {
  public _id: Schema.Types.ObjectId;

  @prop({ enum: ENotificationType, type: String })
  public type: ENotificationType;

  @prop({ type: String })
  public title: string;

  @prop({ type: String })
  public body: string;

  @prop({ type: String })
  public url: string;

  @prop({ type: Boolean, default: false })
  public isRead: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;
}

export const AdminNotificationModel = getModelForClass(AdminNotification);
