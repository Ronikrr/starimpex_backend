import { User } from '@/models/users.model';
import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface DataStoredInToken {
  _id: string | ObjectId;
}

export interface RequestWithUser extends Request {
  user: User;
}
