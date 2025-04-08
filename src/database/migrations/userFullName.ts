import { UserModel } from '@/models/users.model';
import { logger } from '@/utils/logger';

export const migrateUserFullName = async () => {
  try {
    logger.info('Migration User full name >>>>>');
    const users = await UserModel.find({});

    for (let index = 0; index < users.length; index++) {
      const [firstName = '', lastName = ''] = users[index].fullName.split(' ');

      await UserModel.findOneAndUpdate({ _id: users[index]._id }, { $set: { firstName, lastName } });
    }

    logger.info('ALL USERS UPDATED >>>');
    return true;
  } catch (error) {
    logger.error('Error while migrating user full name >>> ');
    logger.error(error);

    return false;
  }
};
