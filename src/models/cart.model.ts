import { Ref, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { Diamond } from './diamonds.model';
import { EDiamondStatus } from '@/interfaces/diamonds.interface';

@index({ updatedAt: -1 })
@modelOptions({ schemaOptions: { collection: 'carts', timestamps: true } })
export class Cart {
  public _id: Schema.Types.ObjectId;

  @prop({ ref: User })
  public userId: Ref<User>;

  @prop({ ref: Diamond })
  public diamond: Ref<Diamond>;

  @prop({ type: Object })
  public diamondSnapshot: object;

  @prop({ type: String, enum: EDiamondStatus, default: EDiamondStatus.AVAILABLE })
  public status: string;
}

export const CartModel = getModelForClass(Cart);
