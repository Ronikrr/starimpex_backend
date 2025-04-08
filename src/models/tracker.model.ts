import { getModelForClass, prop } from '@typegoose/typegoose';

export class Tracker {
  @prop({ type: Number, default: 0 })
  public lastOrderIncrement: number;
}

export const TrackerModel = getModelForClass(Tracker);
