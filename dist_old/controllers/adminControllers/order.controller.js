"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const order_service_1 = require("../../services/adminServices/order.service");
const order_service_2 = require("../../services/order.service");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class OrderController {
    constructor() {
        this.commonOrderService = typedi_1.default.get(order_service_2.CommonOrderService);
        this.userOrderService = typedi_1.default.get(order_service_1.UserOrderService);
        this.getOrderList = async (req, res, next) => {
            try {
                const skip = req.query.skip ? Number(req.query.skip) : 0;
                const limit = req.query.limit ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const orderNumber = req.query.orderNumber ? String(req.query.orderNumber) : null;
                const fromOrderDate = req.query.fromOrderDate ? new Date(String(req.query.fromOrderDate)) : null;
                const toOrderDate = req.query.toOrderDate ? new Date(String(req.query.toOrderDate)) : null;
                const fromAmount = req.query.fromAmount ? Number(req.query.fromAmount) : null;
                const toAmount = req.query.toAmount ? Number(req.query.toAmount) : null;
                const fromTotalItems = req.query.fromTotalItems ? Number(req.query.fromTotalItems) : null;
                const toTotalItems = req.query.toTotalItems ? Number(req.query.toTotalItems) : null;
                const fromCarats = req.query.fromCarats ? Number(req.query.fromCarats) : null;
                const toCarats = req.query.toCarats ? Number(req.query.toCarats) : null;
                const data = await this.commonOrderService.getOrderList({
                    skip,
                    limit,
                    orderNumber,
                    fromOrderDate,
                    toOrderDate,
                    fromAmount,
                    toAmount,
                    fromTotalItems,
                    toTotalItems,
                    fromCarats,
                    toCarats,
                });
                res.success(response_messages_1.ResponseMessages.ORDER_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrderDetails = async (req, res, next) => {
            try {
                const orderId = req.params.id ? String(req.params.id) : null;
                const _a = await this.commonOrderService.getOrderDetails(orderId), { order } = _a, otherData = tslib_1.__rest(_a, ["order"]);
                res.success(response_messages_1.ResponseMessages.ORDER_FOUND, Object.assign(Object.assign({}, (0, adminFilters_1.filterOrder)(order)), otherData));
            }
            catch (error) {
                next(error);
            }
        };
        this.changeOrderStatus = async (req, res, next) => {
            try {
                const orderId = req.params.id ? String(req.params.id) : null;
                const data = await this.userOrderService.changeOrderStatus(req.body, orderId);
                res.success(response_messages_1.ResponseMessages.ORDER_STATUS_CHANGE_SUCCESS, (0, adminFilters_1.filterOrder)(data));
            }
            catch (error) {
                next(error);
            }
        };
        this.updateAdditionalCharges = async (req, res, next) => {
            try {
                const orderId = req.params.id ? String(req.params.id) : null;
                const data = await this.userOrderService.updateAdditionalCharges(req.body, orderId);
                res.success(response_messages_1.ResponseMessages.ORDER_UPDATE_ADDITIONAL_CHARGES_SUCCESS, (0, adminFilters_1.filterOrder)(data));
            }
            catch (error) {
                next(error);
            }
        };
        this.exportOrdersExcel = async (req, res, next) => {
            try {
                const orderIds = req.body.orderIds;
                const buffer = await this.commonOrderService.exportOrdersExcel(orderIds);
                res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrderItems = async (req, res, next) => {
            try {
                const orderNumber = req.params.orderNumber ? String(req.params.orderNumber) : null;
                const orderItems = await this.userOrderService.getOrderItems(orderNumber);
                res.success(response_messages_1.ResponseMessages.ORDER_FOUND, { orderItems: orderItems });
            }
            catch (error) {
                next(error);
            }
        };
        this.createOrder = async (req, res, next) => {
            try {
                const data = req.body;
                const orderData = await this.userOrderService.createOrder(data);
                res.success(`#${orderData.orderNumber} ${response_messages_1.ResponseMessages.ORDER_CREATE_SUCCESS}`, (0, adminFilters_1.filterOrder)(orderData));
            }
            catch (error) {
                next(error);
            }
        };
        this.updateOrder = async (req, res, next) => {
            try {
                const orderId = req.params.id;
                const data = req.body;
                const orderData = await this.userOrderService.updateOrder(data, orderId);
                res.success(response_messages_1.ResponseMessages.ORDER_UPDATE_SUCCESS, (0, adminFilters_1.filterOrder)(orderData));
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map