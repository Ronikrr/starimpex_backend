import { EMessengerType, EUserStatus } from '@/interfaces/users.interface';
import { prop, getModelForClass, modelOptions, index } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@index({ updatedAt: -1 })
@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  _id: Schema.Types.ObjectId;

  @prop({ type: String, required: true })
  public fullName: string;

  @prop({ type: String, required: true })
  public firstName: string;

  @prop({ type: String, required: true })
  public lastName: string;

  @prop({ type: String, required: true })
  public companyName: string;

  @prop({ type: String, required: true })
  public address: string;

  @prop({ type: String, required: true })
  public state: string;

  @prop({ type: String, required: true })
  public city: string;

  @prop({ type: String, required: true })
  public country: string;

  @prop({ type: String })
  public mobileNumber: string;

  @prop({ type: String })
  public telephoneNumber: string;

  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ enum: EMessengerType })
  public messengerType: string;

  @prop({ type: String })
  public messengerIdNumber: string;

  @prop({ type: String })
  public website: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ type: String })
  public notes: string;

  @prop({ enum: EUserStatus, default: EUserStatus.PENDING })
  public status: string;

  @prop({ type: String })
  public token: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

export const UserModel = getModelForClass(User);
