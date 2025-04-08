import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@index({ rapDate: -1, lowSize: -1, highSize: -1 })
@modelOptions({ schemaOptions: { collection: 'rapPrice', timestamps: true } })
export class RapPrice {
  public _id: Schema.Types.ObjectId;

  @prop({ type: String })
  public shape: string;

  @prop({ type: Number })
  public lowSize: number;

  @prop({ type: Number })
  public highSize: number;

  @prop({ type: String })
  public color: string;

  @prop({ type: String })
  public clarity: string;

  @prop({ type: Number })
  public price: number;

  @prop({ type: Date })
  public rapDate: string;

  public createdAt?: string;
}

export const RapPriceModel = getModelForClass(RapPrice);
