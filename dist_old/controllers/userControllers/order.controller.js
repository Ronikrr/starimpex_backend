"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const order_service_1 = require("../../services/order.service");
const order_service_2 = require("../../services/userServices/order.service");
const userFilters_1 = require("../../utils/filters/userFilters");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class OrderController {
    constructor() {
        this.orderService = typedi_1.default.get(order_service_2.OrderService);
        this.commonOrderService = typedi_1.default.get(order_service_1.CommonOrderService);
        this.createOrder = async (req, res, next) => {
            try {
                await this.orderService.createOrder(req.body, req.user);
                res.success(response_messages_1.ResponseMessages.ORDER_CREATED_SUCCESSFULLY);
            }
            catch (error) {
                next(error);
            }
        };
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
                }, req.user);
                res.success(response_messages_1.ResponseMessages.ORDER_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrderDetails = async (req, res, next) => {
            try {
                const orderId = req.params.id ? String(req.params.id) : null;
                const _a = await this.commonOrderService.getOrderDetails(orderId, req.user), { order } = _a, otherData = tslib_1.__rest(_a, ["order"]);
                res.success(response_messages_1.ResponseMessages.ORDER_FOUND, Object.assign({}, (0, userFilters_1.filterOrder)(order, otherData)));
            }
            catch (error) {
                next(error);
            }
        };
        this.exportOrdersExcel = async (req, res, next) => {
            try {
                const orderIds = req.body.orderIds;
                const buffer = await this.commonOrderService.exportOrdersExcel(orderIds, req.user);
                res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map