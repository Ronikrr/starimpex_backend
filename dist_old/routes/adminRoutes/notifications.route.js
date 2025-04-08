"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const notification_controller_1 = require("../../controllers/adminControllers/notification.controller");
const notification_dto_1 = require("../../dtos/adminDtos/notification.dto");
const common_dto_1 = require("../../dtos/common.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const express_1 = require("express");
class NotificationRoute {
    constructor() {
        this.path = '/notification';
        this.router = (0, express_1.Router)();
        this.notificationController = new notification_controller_1.NotificationController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(notification_dto_1.GetNotificationDto, 'query'), this.notificationController.getNotifications);
        this.router.get(`${this.path}/read/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.notificationController.markNotificationRead);
        this.router.delete(`${this.path}/clear/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.notificationController.deleteNotification);
        this.router.delete(`${this.path}/clear-all`, adminAuth_middleware_1.default, this.notificationController.deleteAllNotification);
    }
}
exports.default = NotificationRoute;
//# sourceMappingURL=notifications.route.js.map