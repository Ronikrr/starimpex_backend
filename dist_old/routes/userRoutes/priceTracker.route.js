"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTrackerRoute = void 0;
const tslib_1 = require("tslib");
const priceTracker_controller_1 = require("../../controllers/userControllers/priceTracker.controller");
const priceTracker_dto_1 = require("../../dtos/userDtos/priceTracker.dto");
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const express_1 = require("express");
class PriceTrackerRoute {
    constructor() {
        this.path = '/price-track';
        this.router = (0, express_1.Router)();
        this.priceTrackerController = new priceTracker_controller_1.PriceTrackerController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(priceTracker_dto_1.AddToPriceTrackerDto), this.priceTrackerController.addToPriceTracker);
        this.router.get(`${this.path}/list`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(priceTracker_dto_1.GetPriceTrackListDto, 'query'), this.priceTrackerController.getPriceTrackList);
        this.router.delete(`${this.path}/remove`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(priceTracker_dto_1.RemoveFromPriceTrackerDto), this.priceTrackerController.removeFromPriceTracker);
    }
}
exports.PriceTrackerRoute = PriceTrackerRoute;
//# sourceMappingURL=priceTracker.route.js.map