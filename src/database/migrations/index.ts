import { logger } from '@/utils/logger';
import { dbConnection } from '..';
import { migrateUserFullName } from './userFullName';
import { migrateSyncIndexes } from './syncIndexes';

(async () => {
  try {
    await dbConnection();
    await migrateUserFullName();
    await migrateSyncIndexes();

    process.exit();
  } catch (error) {
    logger.error('Error in migration >>> ');
    logger.error(error);
    process.exit();
  }
})();
