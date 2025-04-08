"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const tslib_1 = require("tslib");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const diamonds_model_1 = require("../../models/diamonds.model");
const order_model_1 = require("../../models/order.model");
const priceTracker_model_1 = require("../../models/priceTracker.model");
const searchHistory_model_1 = require("../../models/searchHistory.model");
const userFilters_1 = require("../../utils/filters/userFilters");
const typedi_1 = require("typedi");
let DashboardService = class DashboardService {
    async getDashboardStats(user) {
        const totalNaturalDiamonds = await diamonds_model_1.DiamondModel.countDocuments({ diamondType: diamonds_interface_1.EDiamondType.NATURAL_DIAMONDS, isDeleted: false });
        const totalLabGrownDiamonds = await diamonds_model_1.DiamondModel.countDocuments({ diamondType: diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS, isDeleted: false });
        const totalOrdersPlaced = await order_model_1.OrderModel.countDocuments({ user: user._id });
        const totalPriceTrack = await priceTracker_model_1.PriceTrackerModel.countDocuments({ user: user._id });
        const searchHistory = await searchHistory_model_1.SearchHistoryModel.find({ user: user._id }, userFilters_1.filterSearchHistoryProjection).sort({ createdAt: -1 }).limit(5);
        return {
            totalNaturalDiamonds,
            totalLabGrownDiamonds,
            totalOrdersPlaced,
            totalPriceTrack,
            searchHistory,
        };
    }
};
DashboardService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map