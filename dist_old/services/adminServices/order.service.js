"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrderService = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const HttpException_1 = require("../../exceptions/HttpException");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const order_interface_1 = require("../../interfaces/order.interface");
const order_model_1 = require("../../models/order.model");
const tracker_model_1 = require("../../models/tracker.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
let UserOrderService = class UserOrderService {
    async changeOrderStatus(data, orderId) {
        const isPartialConfirmationNotAllowed = data.status !== order_interface_1.EOrderStatus.PARTIALLY_CONFIRM && data.items;
        if (isPartialConfirmationNotAllowed) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PARTIAL_CONFIRMATION_NOT_ALLOWED_ERROR);
        }
        if (data.status === order_interface_1.EOrderStatus.PARTIALLY_CONFIRM) {
            const findOrder = await order_model_1.OrderModel.findOne({ _id: orderId });
            const allItemIds = data.items.map(item => item.itemId);
            const allUpdateItemsMatch = data.status === order_interface_1.EOrderStatus.PARTIALLY_CONFIRM && findOrder && findOrder.items.every(items => allItemIds.includes(items._id.toString()));
            if (!allUpdateItemsMatch) {
                throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_STATUS_CHANGE_ITEMS_NOT_MATCH_ERROR);
            }
            const isSomeItemsConfirm = data.items.some(item => item.isConfirmed === true);
            const isSomeItemsNotConfirm = data.items.some(item => item.isConfirmed === false);
            if (!isSomeItemsConfirm || !isSomeItemsNotConfirm) {
                throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_STATUS_CHANGE_TYPE_PARTIAL_ITEMS_NOT_PARTIALLY_CONFIRMED_ERROR);
            }
        }
        const updateOrder = {
            status: data.status,
        };
        if (data.status !== order_interface_1.EOrderStatus.PARTIALLY_CONFIRM) {
            updateOrder['items.$[].confirmationStatus'] =
                data.status === order_interface_1.EOrderStatus.CONFIRM
                    ? order_interface_1.EOrderItemStatus.CONFIRM
                    : data.status === order_interface_1.EOrderStatus.CANCELED
                        ? order_interface_1.EOrderItemStatus.NOT_CONFIRM
                        : order_interface_1.EOrderItemStatus.PENDING;
        }
        let itemFilters = [];
        if (data.status === order_interface_1.EOrderStatus.PARTIALLY_CONFIRM) {
            const confirmIds = [];
            const notConfirmIds = [];
            for (let index = 0; index < data.items.length; index++) {
                if (data.items[index].isConfirmed) {
                    confirmIds.push(new mongoose_1.Types.ObjectId(data.items[index].itemId));
                }
                else {
                    notConfirmIds.push(new mongoose_1.Types.ObjectId(data.items[index].itemId));
                }
            }
            itemFilters = [
                {
                    'confirmItems._id': { $in: confirmIds },
                },
                {
                    'notConfirmItems._id': { $in: notConfirmIds },
                },
            ];
            updateOrder['items.$[confirmItems].confirmationStatus'] = order_interface_1.EOrderItemStatus.CONFIRM;
            updateOrder['items.$[notConfirmItems].confirmationStatus'] = order_interface_1.EOrderItemStatus.NOT_CONFIRM;
        }
        const updatedOrder = await order_model_1.OrderModel.findOneAndUpdate({ _id: orderId }, { $set: updateOrder }, { new: true, arrayFilters: itemFilters });
        if (!updatedOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        return updatedOrder;
    }
    async updateAdditionalCharges(data, orderId) {
        const updatedOrder = await order_model_1.OrderModel.findOneAndUpdate({ _id: orderId }, { $set: { shippingCharge: data.shippingCharge, additionalCharges: data === null || data === void 0 ? void 0 : data.additionalCharges } }, { new: true });
        if (!updatedOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        return updatedOrder;
    }
    async getOrderItems(orderNumber) {
        const findOrder = await order_model_1.OrderModel.findOne({ orderNumber: orderNumber.toUpperCase() });
        if (!findOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        return findOrder.items;
    }
    async createOrder(createData) {
        let grossAmount = 0;
        let totalCarats = 0;
        const orderItems = createData.orderItems.map(item => {
            grossAmount += Number(item.ourPrice);
            totalCarats += Number(item.caratWeight);
            return Object.assign(Object.assign({}, item), { confirmationStatus: order_interface_1.EOrderItemStatus.PENDING, status: diamonds_interface_1.EDiamondStatus.AVAILABLE });
        });
        const updatedTracker = await tracker_model_1.TrackerModel.findOneAndUpdate({}, { $inc: { lastOrderIncrement: 1 } }, { upsert: true, new: true });
        const orderNumber = config_1.INITIAL_ORDER_NUMBER + updatedTracker.lastOrderIncrement;
        const orderDate = new Date(createData.orderDate);
        const createdOrder = await order_model_1.OrderModel.create({
            items: orderItems,
            orderNumber: `${config_1.ORDER_NUMBER_PREFIX}${orderNumber}`,
            totalStones: orderItems.length,
            grossAmount: Number(grossAmount.toFixed(2)),
            totalCarats: Number(totalCarats.toFixed(2)),
            isManualOrder: true,
            companyName: (createData === null || createData === void 0 ? void 0 : createData.companyName) || null,
            companyEmail: (createData === null || createData === void 0 ? void 0 : createData.companyEmail) || null,
            description: (createData === null || createData === void 0 ? void 0 : createData.description) || null,
            createdAt: orderDate,
        });
        return createdOrder;
    }
    async updateOrder(updateData, orderId) {
        let grossAmount = 0;
        let totalCarats = 0;
        const orderItems = updateData.orderItems.map(item => {
            grossAmount += Number(item.ourPrice);
            totalCarats += Number(item.caratWeight);
            return Object.assign(Object.assign({}, item), { confirmationStatus: order_interface_1.EOrderItemStatus.PENDING, status: diamonds_interface_1.EDiamondStatus.AVAILABLE });
        });
        const orderDate = new Date(updateData.orderDate);
        const updatedOrder = await order_model_1.OrderModel.findOneAndUpdate({
            _id: orderId,
            isManualOrder: true,
        }, {
            $set: {
                items: orderItems,
                totalStones: orderItems.length,
                grossAmount: Number(grossAmount.toFixed(2)),
                totalCarats: Number(totalCarats.toFixed(2)),
                companyName: (updateData === null || updateData === void 0 ? void 0 : updateData.companyName) || null,
                companyEmail: (updateData === null || updateData === void 0 ? void 0 : updateData.companyEmail) || null,
                description: (updateData === null || updateData === void 0 ? void 0 : updateData.description) || null,
                createdAt: orderDate,
            },
        }, {
            new: true,
        });
        if (!updatedOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_NOT_FOUND_OR_CANNOT_UPDATE);
        }
        return updatedOrder;
    }
};
UserOrderService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserOrderService);
exports.UserOrderService = UserOrderService;
//# sourceMappingURL=order.service.js.map