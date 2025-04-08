"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
const order_controller_1 = require("../../controllers/userControllers/order.controller");
const order_dto_1 = require("../../dtos/userDtos/order.dto");
const order_dto_2 = require("../../dtos/order.dto");
const common_dto_1 = require("../../dtos/common.dto");
class OrderRoute {
    constructor() {
        this.path = '/order';
        this.router = (0, express_1.Router)();
        this.orderController = new order_controller_1.OrderController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.CreateOrderDto), this.orderController.createOrder);
        this.router.get(`${this.path}/list`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_2.GetOrderListDto, 'query'), this.orderController.getOrderList);
        this.router.get(`${this.path}/details/:id`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.orderController.getOrderDetails);
        this.router.post(`${this.path}/export`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_2.ExportOrdersExcelDto), this.orderController.exportOrdersExcel);
    }
}
exports.OrderRoute = OrderRoute;
//# sourceMappingURL=order.route.js.map