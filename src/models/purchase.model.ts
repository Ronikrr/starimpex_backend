import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@index({ date: -1 })
@index({ orderId: 1 })
@modelOptions({ schemaOptions: { collection: 'purchases', timestamps: true } })
export class Purchase {
  public _id: Schema.Types.ObjectId;

  @prop({ type: String, required: true })
  public orderId: string;

  @prop({ type: Date, required: true })
  public date: Date;

  @prop({ type: String })
  public supplierName: string;

  @prop({ type: String })
  public supplierAddress: string;

  @prop({ type: String })
  public description: string;

  @prop({ type: Object, required: true })
  public items: object[];

  @prop({ type: Boolean, default: false })
  public isDeleted: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;
}

export const PurchaseModel = getModelForClass(Purchase);
