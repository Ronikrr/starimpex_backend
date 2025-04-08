import { EDiamondStatus, EDiamondType, ESourceType } from '@/interfaces/diamonds.interface';
import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

@index({ updatedAt: -1, pricePerCarat: 1 })
@modelOptions({ schemaOptions: { collection: 'diamonds', timestamps: true } })
export class Diamond {
  public _id: Schema.Types.ObjectId;

  @prop({ type: String, unique: true })
  public uniqueStoneId: string;

  @prop({ type: String, enum: EDiamondType })
  public diamondType: string;

  @prop({ type: String })
  public stoneNo: string;

  @prop({ type: String, enum: ESourceType })
  public source: string;

  @prop({ type: String })
  public lab: string;

  @prop({ type: String })
  public inscription: string;

  @prop({ type: String })
  public shape: string;

  @prop({ type: Number })
  public caratWeight: number;

  @prop({ type: Number })
  public pricePerCarat: number;

  @prop({ type: String })
  public color: string;

  @prop({ type: String })
  public fancyColor: string;

  @prop({ type: String })
  public fancyIntensity: string;

  @prop({ type: String })
  public fancyOvertone: string;

  @prop({ type: Boolean })
  public noBGM: boolean;

  @prop({ type: String })
  public clarity: string;

  @prop({ type: String })
  public cut: string;

  @prop({ type: String })
  public polish: string;

  @prop({ type: String })
  public symmetry: string;

  @prop({ type: String })
  public florescence: string;

  @prop({ type: String })
  public type: string;

  @prop({ type: String })
  public country: string;

  @prop({ type: String })
  public state: string;

  @prop({ type: String })
  public city: string;

  @prop({ type: String })
  public region: string;

  @prop({ type: String })
  public shade: string;

  @prop({ type: String })
  public luster: string;

  @prop({ type: Number })
  public eyeClean: number;

  @prop({ type: String })
  public milky: string;

  @prop({ type: String })
  public inclusion: string;

  @prop({ type: String })
  public extraFacet: string;

  @prop({ type: String })
  public internalGraining: string;

  @prop({ type: String })
  public surfaceGraining: string;

  @prop({ type: Boolean })
  public heartsAndArrows: boolean;

  @prop({ type: String })
  public measurement: string;

  @prop({ type: Number })
  public length: number;

  @prop({ type: Number })
  public width: number;

  @prop({ type: Number })
  public height: number;

  @prop({ type: Number })
  public depthPercentage: number;

  @prop({ type: Number })
  public tablePercentage: number;

  @prop({ type: Number })
  public crownAngle: number;

  @prop({ type: Number })
  public crownHeight: number;

  @prop({ type: Number })
  public pavilionAngle: number;

  @prop({ type: Number })
  public pavilionHeight: number;

  @prop({ type: String })
  public starLength: string;

  @prop({ type: String })
  public lowerHalves: string;

  @prop({ type: String })
  public girdleType: string;

  @prop({ type: Number })
  public girdlePercentage: number;

  @prop({ type: String })
  public culetSize: string;

  @prop({ type: Number })
  public ratio: number;

  @prop({ type: String })
  public notes: string;

  @prop({ type: String })
  public videoLink: string;

  @prop({ type: String })
  public imageLink: string;

  @prop({ type: String })
  public certificateLink: string;

  @prop({ type: String })
  public certificateComment: string;

  @prop({ type: String })
  public motibaGemsComment: string;

  @prop({ type: Number })
  public rap: number;

  @prop({ type: Number })
  public ourPrice: number;

  @prop({ type: Number })
  public ourDiscount: number;

  @prop({ type: Object })
  public metadata: object;

  @prop({ type: Boolean, default: false })
  public isDeleted: boolean;

  @prop({ type: String })
  public keyToSymbol: string[];

  @prop({ type: String, enum: EDiamondStatus, default: EDiamondStatus.AVAILABLE })
  public status: string;
}

export const DiamondModel = getModelForClass(Diamond);
