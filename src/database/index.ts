import { connect } from 'mongoose';
import { MONGODB_URI } from '@config';

export const dbConnection = async () => {
  await connect(MONGODB_URI);
};
