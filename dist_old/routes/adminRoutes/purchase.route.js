"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const purchase_controller_1 = require("../../controllers/adminControllers/purchase.controller");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const purchase_dto_1 = require("../../dtos/adminDtos/purchase.dto");
const common_dto_1 = require("../../dtos/common.dto");
class PurchaseRoute {
    constructor() {
        this.path = '/purchase';
        this.router = (0, express_1.Router)();
        this.purchaseController = new purchase_controller_1.PurchaseController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(purchase_dto_1.CreatePurchaseDto), this.purchaseController.createPurchase);
        this.router.put(`${this.path}/update/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(purchase_dto_1.UpdatePurchaseDto), this.purchaseController.updatePurchase);
        this.router.get(`${this.path}/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(purchase_dto_1.GetPurchaseListDto, 'query'), this.purchaseController.getPurchaseList);
        this.router.delete(`${this.path}/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.purchaseController.deletePurchase);
        this.router.post(`${this.path}/export`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(purchase_dto_1.ExportPurchasesExcelDto), this.purchaseController.exportPurchasesExcel);
        this.router.get(`${this.path}/details/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.purchaseController.getPurchaseDetails);
    }
}
exports.PurchaseRoute = PurchaseRoute;
//# sourceMappingURL=purchase.route.js.map