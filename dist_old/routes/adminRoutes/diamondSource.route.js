"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondSourceRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const diamondSource_controller_1 = require("../../controllers/adminControllers/diamondSource.controller");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const diamondSource_dto_1 = require("../../dtos/adminDtos/diamondSource.dto");
class DiamondSourceRoute {
    constructor() {
        this.path = '/diamond-source';
        this.router = (0, express_1.Router)();
        this.diamondSourceController = new diamondSource_controller_1.DiamondSourceController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/list`, adminAuth_middleware_1.default, this.diamondSourceController.getDiamondSourceList);
        this.router.put(`${this.path}/active`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(diamondSource_dto_1.EnableDisableSourceDto), this.diamondSourceController.enableDisableDiamondSource);
        this.router.put(`${this.path}/update-markup`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(diamondSource_dto_1.UpdateMarkupPercentageDto), this.diamondSourceController.updateMarkupPercentage);
    }
}
exports.DiamondSourceRoute = DiamondSourceRoute;
//# sourceMappingURL=diamondSource.route.js.map