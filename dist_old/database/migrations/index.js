"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../utils/logger");
const __1 = require("..");
const userFullName_1 = require("./userFullName");
const syncIndexes_1 = require("./syncIndexes");
(async () => {
    try {
        await (0, __1.dbConnection)();
        await (0, userFullName_1.migrateUserFullName)();
        await (0, syncIndexes_1.migrateSyncIndexes)();
        process.exit();
    }
    catch (error) {
        logger_1.logger.error('Error in migration >>> ');
        logger_1.logger.error(error);
        process.exit();
    }
})();
//# sourceMappingURL=index.js.map