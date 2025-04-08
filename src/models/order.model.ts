import { Ref, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { EOrderStatus, IOrderAdditionalCharge, IOrderItem } from '@/interfaces/order.interface';

@index({ createdAt: -1 })
@modelOptions({ schemaOptions: { collection: 'orders', timestamps: true } })
export class Order {
  public _id: Schema.Types.ObjectId;

  @prop({ type: String, unique: true })
  public orderNumber: string;

  @prop({ type: Array<IOrderItem> })
  public items: Array<IOrderItem>;

  @prop({ type: String })
  public remarks: string;

  @prop({ ref: User })
  public user: Ref<User>;

  @prop({ type: Number, default: 0 })
  public shippingCharge: number;

  @prop({ type: Array<IOrderAdditionalCharge> })
  public additionalCharges: Array<IOrderAdditionalCharge>;

  @prop({ type: Number })
  public grossAmount: number;

  @prop({ type: Number })
  public totalStones: number;

  @prop({ type: Number })
  public totalCarats: number;

  @prop({ type: Boolean })
  public isTermsAccepted: boolean;

  @prop({ type: String, enum: EOrderStatus, default: EOrderStatus.PENDING })
  public status: string;

  @prop({ type: Boolean, default: false })
  public isManualOrder: boolean;

  @prop({ type: String })
  public companyName: string;

  @prop({ type: String })
  public companyEmail: string;

  @prop({ type: String })
  public description: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

export const OrderModel = getModelForClass(Order);
