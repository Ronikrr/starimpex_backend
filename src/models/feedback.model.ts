import { Ref, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';

@index({ createdA: -1 })
@modelOptions({ schemaOptions: { collection: 'feedbacks', timestamps: true } })
export class Feedback {
  public _id: Schema.Types.ObjectId;

  @prop({ ref: User })
  public user: Ref<User>;

  @prop({ type: Number })
  public rating: number;

  @prop({ type: String })
  public comment: string;
}

export const FeedbackModel = getModelForClass(Feedback);
