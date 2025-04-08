import { ESupportRequestStatus } from '@/interfaces/support.interface';
import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@index({ updatedAt: -1 })
@index({ status: 1 })
@index({ firstName: 'text', lastName: 'text', phone: 'text', country: 'text', email: 'text' })
export class Contact {
  _id: Schema.Types.ObjectId;

  @prop({ type: String, required: true })
  public firstName: string;

  @prop({ type: String, required: true })
  public lastName: string;

  @prop({ type: String })
  public phone: string;

  @prop({ type: String, required: true })
  public country: string;

  @prop({ type: String, required: true })
  public email: string;

  @prop({ type: String, required: true })
  public message: string;

  @prop({ enum: ESupportRequestStatus, default: ESupportRequestStatus.PENDING })
  public status: string;
}

export const ContactModel = getModelForClass(Contact);
