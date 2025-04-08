import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'adminSettings', timestamps: true } })
export class AdminSettings {
  public _id: Schema.Types.ObjectId;

  @prop({ type: String })
  public fcmTokens: string[];

  public createdAt?: Date;

  public updatedAt?: Date;
}

export const AdminSettingsModel = getModelForClass(AdminSettings);
