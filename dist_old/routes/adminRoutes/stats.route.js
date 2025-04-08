"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const stats_controller_1 = require("../../controllers/adminControllers/stats.controller");
const stats_dto_1 = require("../../dtos/adminDtos/stats.dto");
class StatsRoute {
    constructor() {
        this.path = '/stats';
        this.router = (0, express_1.Router)();
        this.statsController = new stats_controller_1.StatsController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/diamond-search`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(stats_dto_1.GetSearchListDto, 'query'), this.statsController.getDiamondSearchList);
    }
}
exports.StatsRoute = StatsRoute;
//# sourceMappingURL=stats.route.js.map