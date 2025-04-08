"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateSyncIndexes = void 0;
const adminNotification_model_1 = require("../../models/adminNotification.model");
const adminSettings_model_1 = require("../../models/adminSettings.model");
const cart_model_1 = require("../../models/cart.model");
const contact_model_1 = require("../../models/contact.model");
const customerQuery_model_1 = require("../../models/customerQuery.model");
const diamonds_model_1 = require("../../models/diamonds.model");
const diamondSources_model_1 = require("../../models/diamondSources.model");
const feedback_model_1 = require("../../models/feedback.model");
const inquiry_model_1 = require("../../models/inquiry.model");
const order_model_1 = require("../../models/order.model");
const priceTracker_model_1 = require("../../models/priceTracker.model");
const purchase_model_1 = require("../../models/purchase.model");
const searchHistory_model_1 = require("../../models/searchHistory.model");
const tracker_model_1 = require("../../models/tracker.model");
const userCartHistory_model_1 = require("../../models/userCartHistory.model");
const userDiamondNotes_model_1 = require("../../models/userDiamondNotes.model");
const userPriceTrackHistory_model_1 = require("../../models/userPriceTrackHistory.model");
const users_model_1 = require("../../models/users.model");
const logger_1 = require("../../utils/logger");
const migrateSyncIndexes = async () => {
    try {
        logger_1.logger.info('Migration sync indexes >>>>>');
        await adminNotification_model_1.AdminNotificationModel.syncIndexes();
        await adminSettings_model_1.AdminSettingsModel.syncIndexes();
        await cart_model_1.CartModel.syncIndexes();
        await contact_model_1.ContactModel.syncIndexes();
        await customerQuery_model_1.CustomerQueryModel.syncIndexes();
        await diamonds_model_1.DiamondModel.syncIndexes();
        await diamondSources_model_1.DiamondSourceModel.syncIndexes();
        await feedback_model_1.FeedbackModel.syncIndexes();
        await inquiry_model_1.InquiryModel.syncIndexes();
        await order_model_1.OrderModel.syncIndexes();
        await priceTracker_model_1.PriceTrackerModel.syncIndexes();
        await purchase_model_1.PurchaseModel.syncIndexes();
        await searchHistory_model_1.SearchHistoryModel.syncIndexes();
        await tracker_model_1.TrackerModel.syncIndexes();
        await userCartHistory_model_1.UserCartHistoryModel.syncIndexes();
        await userDiamondNotes_model_1.UserDiamondNotesModel.syncIndexes();
        await userPriceTrackHistory_model_1.UserPriceTrackHistoryModel.syncIndexes();
        await users_model_1.UserModel.syncIndexes();
        logger_1.logger.info('ALL Indexed synced >>>');
        return true;
    }
    catch (error) {
        logger_1.logger.error('Error while migrating sync indexes >>> ');
        logger_1.logger.error(error);
        return false;
    }
};
exports.migrateSyncIndexes = migrateSyncIndexes;
//# sourceMappingURL=syncIndexes.js.map