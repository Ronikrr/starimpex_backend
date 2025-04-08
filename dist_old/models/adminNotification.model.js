"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationModel = exports.AdminNotification = void 0;
const tslib_1 = require("tslib");
const notification_interface_1 = require("../interfaces/adminInterfaces/notification.interface");
const typegoose_1 = require("@typegoose/typegoose");
let AdminNotification = class AdminNotification {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ enum: notification_interface_1.ENotificationType, type: String }),
    tslib_1.__metadata("design:type", String)
], AdminNotification.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], AdminNotification.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], AdminNotification.prototype, "body", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], AdminNotification.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], AdminNotification.prototype, "isRead", void 0);
AdminNotification = tslib_1.__decorate([
    (0, typegoose_1.index)({ createdAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'adminNotifications', timestamps: true } })
], AdminNotification);
exports.AdminNotification = AdminNotification;
exports.AdminNotificationModel = (0, typegoose_1.getModelForClass)(AdminNotification);
//# sourceMappingURL=adminNotification.model.js.map