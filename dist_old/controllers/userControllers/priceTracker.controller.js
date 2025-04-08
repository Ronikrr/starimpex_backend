"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTrackerController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const priceTracker_service_1 = require("../../services/userServices/priceTracker.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class PriceTrackerController {
    constructor() {
        this.priceTrackerService = typedi_1.default.get(priceTracker_service_1.PriceTrackerService);
        this.addToPriceTracker = async (req, res, next) => {
            try {
                await this.priceTrackerService.addToPriceTracker(req.body, req.user);
                res.success(response_messages_1.ResponseMessages.PRICE_TRACKER_ADD_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.getPriceTrackList = async (req, res, next) => {
            var _a, _b;
            try {
                const skip = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.skip) ? Number(req.query.skip) : 0;
                const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const data = await this.priceTrackerService.getPriceTrackList({ skip, limit }, req.user);
                res.success(response_messages_1.ResponseMessages.PRICE_TRACK_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.removeFromPriceTracker = async (req, res, next) => {
            try {
                await this.priceTrackerService.removeFromPriceTracker(req.body, req.user);
                res.success(response_messages_1.ResponseMessages.PRICE_TRACK_REMOVE_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.PriceTrackerController = PriceTrackerController;
//# sourceMappingURL=priceTracker.controller.js.map