"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const adminNotification_model_1 = require("../../models/adminNotification.model");
const fcm_service_1 = require("./fcm.service");
const HttpException_1 = require("../../exceptions/HttpException");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const typedi_1 = require("typedi");
let NotificationService = class NotificationService {
    constructor() {
        this.fcmService = new fcm_service_1.FCMService();
    }
    async createNotification(notificationData, fcmToken) {
        const createdNotification = await adminNotification_model_1.AdminNotificationModel.create(notificationData);
        if (!createdNotification) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.NOTIFICATION_CREATE_ERROR);
        }
        this.fcmService.sendNotification(createdNotification, fcmToken);
        return createdNotification;
    }
    async getNotifications(getData) {
        const totalCount = await adminNotification_model_1.AdminNotificationModel.countDocuments();
        if (!totalCount || totalCount === 0) {
            return { notifications: [], totalPages: 0, totalCount: 0 };
        }
        const notifications = await adminNotification_model_1.AdminNotificationModel.find({}).sort({ createdAt: -1 }).skip(getData.skip).limit(getData.limit);
        return { notifications, totalPages: Math.ceil(totalCount / getData.limit), totalCount };
    }
    async deleteNotification(notificationId) {
        const deletedNotification = await adminNotification_model_1.AdminNotificationModel.findOneAndDelete({ _id: notificationId });
        if (!deletedNotification) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.NOTIFICATION_DELETE_ERROR);
        }
    }
    async deleteAllNotification() {
        await adminNotification_model_1.AdminNotificationModel.deleteMany();
    }
    async markNotificationRead(notificationId) {
        const updatedNotification = await adminNotification_model_1.AdminNotificationModel.findOneAndUpdate({ _id: notificationId }, { $set: { isRead: true } }, { new: true });
        if (!updatedNotification) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.NOTIFICATION_UPDATE_ERROR);
        }
        return updatedNotification;
    }
};
NotificationService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], NotificationService);
exports.default = NotificationService;
//# sourceMappingURL=notification.service.js.map