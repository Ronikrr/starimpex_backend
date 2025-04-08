import { Ref, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';

@modelOptions({ schemaOptions: { collection: 'userDiamondNotes', timestamps: true } })
export class UserDiamondNotes {
  public _id: Schema.Types.ObjectId;

  @prop({ ref: User, required: true })
  public user: Ref<User>;

  @prop({ type: String, required: true })
  public uniqueStoneId: string;

  @prop({ type: String, required: true })
  public notes: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

export const UserDiamondNotesModel = getModelForClass(UserDiamondNotes);
