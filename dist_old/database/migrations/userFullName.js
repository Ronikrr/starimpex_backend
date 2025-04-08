"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateUserFullName = void 0;
const users_model_1 = require("../../models/users.model");
const logger_1 = require("../../utils/logger");
const migrateUserFullName = async () => {
    try {
        logger_1.logger.info('Migration User full name >>>>>');
        const users = await users_model_1.UserModel.find({});
        for (let index = 0; index < users.length; index++) {
            const [firstName = '', lastName = ''] = users[index].fullName.split(' ');
            await users_model_1.UserModel.findOneAndUpdate({ _id: users[index]._id }, { $set: { firstName, lastName } });
        }
        logger_1.logger.info('ALL USERS UPDATED >>>');
        return true;
    }
    catch (error) {
        logger_1.logger.error('Error while migrating user full name >>> ');
        logger_1.logger.error(error);
        return false;
    }
};
exports.migrateUserFullName = migrateUserFullName;
//# sourceMappingURL=userFullName.js.map