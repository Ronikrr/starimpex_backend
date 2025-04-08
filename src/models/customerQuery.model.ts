import { Ref, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { ESupportRequestStatus } from '@/interfaces/support.interface';

@index({ updatedAt: -1 })
@index({ status: 1 })
@modelOptions({ schemaOptions: { collection: 'customerQueries', timestamps: true } })
export class CustomerQuery {
  public _id: Schema.Types.ObjectId;

  @prop({ ref: User })
  public user: Ref<User>;

  @prop({ type: String })
  public message: string;

  @prop({ enum: ESupportRequestStatus, default: ESupportRequestStatus.PENDING })
  public status: string;
}

export const CustomerQueryModel = getModelForClass(CustomerQuery);
