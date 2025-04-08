import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './users.model';

@index({ createdAt: -1 })
@modelOptions({ schemaOptions: { collection: 'userCartHistory', timestamps: true } })
export class UserCartHistory {
  @prop({ type: String })
  public stoneNos: string;

  @prop({ ref: User })
  public user: Ref<User>;

  public createdAt?: Date;
}

export const UserCartHistoryModel = getModelForClass(UserCartHistory);
