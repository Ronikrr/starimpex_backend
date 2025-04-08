"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const HttpException_1 = require("../../exceptions/HttpException");
const order_interface_1 = require("../../interfaces/order.interface");
const cart_model_1 = require("../../models/cart.model");
const diamonds_model_1 = require("../../models/diamonds.model");
const order_model_1 = require("../../models/order.model");
const tracker_model_1 = require("../../models/tracker.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const helpers_1 = require("../../utils/helpers");
const mailer_1 = require("../../utils/mailer");
const typedi_1 = require("typedi");
const notification_service_1 = tslib_1.__importDefault(require("../adminServices/notification.service"));
const adminSettings_model_1 = require("../../models/adminSettings.model");
const notification_interface_1 = require("../../interfaces/adminInterfaces/notification.interface");
const fileExport_1 = require("../../utils/fileExport");
async function newOrderPlacedNotification(createdOrder, user) {
    var _a;
    const notificationService = new notification_service_1.default();
    const fcmToken = ((_a = (await adminSettings_model_1.AdminSettingsModel.findOne())) === null || _a === void 0 ? void 0 : _a.fcmTokens) || [];
    const notification = {
        title: 'New Order',
        body: `#${createdOrder.orderNumber} placed by ${user.fullName}`,
        type: notification_interface_1.ENotificationType.NEW_ORDER,
        url: `/admin/order-list/${createdOrder._id}`,
    };
    await notificationService.createNotification(notification, fcmToken);
}
let OrderService = class OrderService {
    async createOrder(data, user) {
        if (!data.isTermsAccepted) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_FAILED_ACCEPT_TERMS_ERROR);
        }
        const findDiamonds = await diamonds_model_1.DiamondModel.find({ _id: { $in: data.items }, isDeleted: false });
        if (findDiamonds.length < data.items.length) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_FAILED_SOLD_OUT_ERROR);
        }
        const updatedTracker = await tracker_model_1.TrackerModel.findOneAndUpdate({}, { $inc: { lastOrderIncrement: 1 } }, { upsert: true, new: true });
        const orderNumber = config_1.INITIAL_ORDER_NUMBER + updatedTracker.lastOrderIncrement;
        let totalCarats = 0;
        let grossAmount = 0;
        const orderItems = findDiamonds.map(diamond => {
            totalCarats += diamond.caratWeight;
            grossAmount += Number(diamond.ourPrice.toFixed(2));
            return Object.assign(Object.assign({}, diamond.toObject()), { confirmationStatus: order_interface_1.EOrderItemStatus.PENDING });
        });
        const createdOrder = await order_model_1.OrderModel.create({
            items: orderItems,
            orderNumber: `${config_1.ORDER_NUMBER_PREFIX}${orderNumber}`,
            user: user._id,
            remarks: data.remarks,
            isTermsAccepted: data.isTermsAccepted,
            totalStones: findDiamonds.length,
            totalCarats: Number(totalCarats.toFixed(2)),
            grossAmount: Number(grossAmount.toFixed(2)),
        });
        if (!createdOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.SOMETHING_WENT_WRONG);
        }
        await cart_model_1.CartModel.deleteMany({
            diamond: { $in: data.items },
            userId: user._id,
        });
        const orderData = findDiamonds.map(diamond => {
            return Object.assign({ orderNumber: createdOrder.orderNumber }, diamond.toObject());
        });
        const finalDiamondData = (0, helpers_1.formatOrderToExcelData)(orderData);
        const buffer = await (0, fileExport_1.getOrderExcelBuffer)(finalDiamondData, `Order Stone Details ${(0, helpers_1.formatDate)(new Date())}`);
        (0, mailer_1.sendPlacedOrderMail)({ user, order: createdOrder, excelBuffer: buffer });
        newOrderPlacedNotification(createdOrder, user);
    }
};
OrderService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map