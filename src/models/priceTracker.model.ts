import { Ref, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { EDiamondStatus } from '@/interfaces/diamonds.interface';

@index({ updatedAt: -1 })
@modelOptions({ schemaOptions: { collection: 'priceTracker', timestamps: true } })
export class PriceTracker {
  public _id: Schema.Types.ObjectId;

  @prop({ ref: User })
  public user: Ref<User>;

  @prop({ type: Object })
  public diamondSnapshot: object;

  @prop({ type: String, enum: EDiamondStatus, default: EDiamondStatus.AVAILABLE })
  public status: string;
}

export const PriceTrackerModel = getModelForClass(PriceTracker);
