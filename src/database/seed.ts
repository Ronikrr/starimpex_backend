import { ESourceType } from '@/interfaces/diamonds.interface';
import { DiamondSourceModel } from '@/models/diamondSources.model';
import { logger } from '@/utils/logger';
import { dbConnection } from '.';

dbConnection();
async function seedDiamondSources() {
  logger.info('>>>>> SEEDING DIAMOND SOURCES');

  for (const source of Object.values(ESourceType)) {
    logger.info(`>>>> SEEDING Source ${source}`);

    const sourceExists = await DiamondSourceModel.findOne({ sourceType: source });

    if (!sourceExists) {
      const createdSource = await DiamondSourceModel.create({
        sourceType: source,
      });
      logger.info(`>>>> SEEDING source ${source} created`);
      logger.info(JSON.stringify(createdSource.toObject()));
    } else {
      logger.info(`>>>> SEEDING source ${source} found`);
      logger.info(JSON.stringify(sourceExists.toObject()));
    }
  }

  process.exit();
}

seedDiamondSources();
