import { ESourceType } from '@/interfaces/diamonds.interface';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'diamondSources', timestamps: true } })
export class DiamondSource {
  @prop({ type: String, required: true, unique: true, enum: ESourceType })
  public sourceType: string;

  @prop({ type: Number, default: 0 })
  public markupPercentage: number;

  @prop({ type: Boolean, default: false })
  public isDisabled: boolean;
}

export const DiamondSourceModel = getModelForClass(DiamondSource);
