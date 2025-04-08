"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const order_dto_1 = require("../../dtos/order.dto");
const common_dto_1 = require("../../dtos/common.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const order_controller_1 = require("../../controllers/adminControllers/order.controller");
const order_dto_2 = require("../../dtos/adminDtos/order.dto");
class OrderRoute {
    constructor() {
        this.path = '/order';
        this.router = (0, express_1.Router)();
        this.orderController = new order_controller_1.OrderController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.GetOrderListDto, 'query'), this.orderController.getOrderList);
        this.router.get(`${this.path}/details/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.orderController.getOrderDetails);
        this.router.put(`${this.path}/change-status/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(order_dto_2.ChangeOrderStatusDto), this.orderController.changeOrderStatus);
        this.router.put(`${this.path}/additional-charges/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(order_dto_2.OrderAdditionChargesDto), this.orderController.updateAdditionalCharges);
        this.router.post(`${this.path}/manual/add`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_2.CreateManualOrderDto), this.orderController.createOrder);
        this.router.put(`${this.path}/manual/update/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(order_dto_2.CreateManualOrderDto), this.orderController.updateOrder);
        this.router.post(`${this.path}/export`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.ExportOrdersExcelDto), this.orderController.exportOrdersExcel);
        this.router.get(`${this.path}/order-items/:orderNumber`, adminAuth_middleware_1.default, this.orderController.getOrderItems);
    }
}
exports.OrderRoute = OrderRoute;
//# sourceMappingURL=order.route.js.map