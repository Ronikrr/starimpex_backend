"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
const diamondSources_model_1 = require("../models/diamondSources.model");
const logger_1 = require("../utils/logger");
const _1 = require(".");
(0, _1.dbConnection)();
async function seedDiamondSources() {
    logger_1.logger.info('>>>>> SEEDING DIAMOND SOURCES');
    for (const source of Object.values(diamonds_interface_1.ESourceType)) {
        logger_1.logger.info(`>>>> SEEDING Source ${source}`);
        const sourceExists = await diamondSources_model_1.DiamondSourceModel.findOne({ sourceType: source });
        if (!sourceExists) {
            const createdSource = await diamondSources_model_1.DiamondSourceModel.create({
                sourceType: source,
            });
            logger_1.logger.info(`>>>> SEEDING source ${source} created`);
            logger_1.logger.info(JSON.stringify(createdSource.toObject()));
        }
        else {
            logger_1.logger.info(`>>>> SEEDING source ${source} found`);
            logger_1.logger.info(JSON.stringify(sourceExists.toObject()));
        }
    }
    process.exit();
}
seedDiamondSources();
//# sourceMappingURL=seed.js.map