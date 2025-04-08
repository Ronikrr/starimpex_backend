"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCMService = void 0;
const tslib_1 = require("tslib");
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const config_1 = require("../../config");
const logger_1 = require("../../utils/logger");
const typedi_1 = require("typedi");
const adminSettings_model_1 = require("../../models/adminSettings.model");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
});
let FCMService = class FCMService {
    async sendNotification(notificationData, fcmToken) {
        if (fcmToken.length === 0)
            return;
        const fcmMessage = {
            webpush: {
                headers: {
                    Urgency: 'high',
                },
                fcmOptions: {
                    link: `${config_1.APP_URL}${notificationData.url}`,
                },
            },
            data: { data: JSON.stringify(notificationData) },
            notification: {
                title: notificationData.title,
                body: notificationData.body,
            },
            tokens: fcmToken,
        };
        logger_1.logger.info(`Sending FCM notification : ${JSON.stringify(fcmMessage)} to admin`);
        const result = await firebase_admin_1.default.messaging().sendEachForMulticast(fcmMessage);
        const removeFcmTokens = result.responses.map((response, index) => {
            if (response.error) {
                return fcmToken[index];
            }
        });
        if (removeFcmTokens.length) {
            await adminSettings_model_1.AdminSettingsModel.findOneAndUpdate({}, { $pull: { fcmTokens: { $in: removeFcmTokens } } });
        }
        logger_1.logger.info(`FCM notification result : ${JSON.stringify(fcmMessage)} with result ${JSON.stringify(result)}`);
    }
};
FCMService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], FCMService);
exports.FCMService = FCMService;
//# sourceMappingURL=fcm.service.js.map