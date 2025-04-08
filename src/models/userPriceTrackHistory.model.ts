import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './users.model';

@index({ createdAt: -1 })
@modelOptions({ schemaOptions: { collection: 'userPriceTrackHistory', timestamps: true } })
export class UserPriceTrackHistory {
  @prop({ type: String })
  public stoneNos: string;

  @prop({ ref: User })
  public user: Ref<User>;

  public createdAt?: Date;
}

export const UserPriceTrackHistoryModel = getModelForClass(UserPriceTrackHistory);
