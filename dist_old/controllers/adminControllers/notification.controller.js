"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const tslib_1 = require("tslib");
const response_messages_1 = require("../../response/response.messages");
const notification_service_1 = tslib_1.__importDefault(require("../../services/adminServices/notification.service"));
class NotificationController {
    constructor() {
        this.notificationService = new notification_service_1.default();
        this.getNotifications = async (req, res, next) => {
            try {
                const skip = Number(req.query.skip || 0);
                const limit = Number(req.query.limit || 10);
                const getData = await this.notificationService.getNotifications({ skip, limit });
                res.success(response_messages_1.ResponseMessages.NOTIFICATION_LIST_FOUND, getData);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteNotification = async (req, res, next) => {
            try {
                await this.notificationService.deleteNotification(req.params.id);
                res.success(response_messages_1.ResponseMessages.NOTIFICATION_DELETE_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteAllNotification = async (req, res, next) => {
            try {
                await this.notificationService.deleteAllNotification();
                res.success(response_messages_1.ResponseMessages.NOTIFICATION_DELETE_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.markNotificationRead = async (req, res, next) => {
            try {
                const updatedNotification = await this.notificationService.markNotificationRead(req.params.id);
                res.success(response_messages_1.ResponseMessages.NOTIFICATION_MARK_READ_SUCCESS, updatedNotification);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map