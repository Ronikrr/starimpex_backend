"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const tslib_1 = require("tslib");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const users_interface_1 = require("../../interfaces/users.interface");
const diamonds_model_1 = require("../../models/diamonds.model");
const inquiry_model_1 = require("../../models/inquiry.model");
const searchHistory_model_1 = require("../../models/searchHistory.model");
const users_model_1 = require("../../models/users.model");
const typedi_1 = require("typedi");
let DashboardService = class DashboardService {
    async getDashboardStats() {
        const totalApprovedUser = await users_model_1.UserModel.countDocuments({ status: users_interface_1.EUserStatus.APPROVED });
        const totalInquiries = await inquiry_model_1.InquiryModel.countDocuments({});
        const totalNaturalDiamonds = await diamonds_model_1.DiamondModel.countDocuments({ diamondType: diamonds_interface_1.EDiamondType.NATURAL_DIAMONDS, isDeleted: false });
        const totalLabGrownDiamonds = await diamonds_model_1.DiamondModel.countDocuments({ diamondType: diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS, isDeleted: false });
        const totalSearches = await searchHistory_model_1.SearchHistoryModel.countDocuments();
        return {
            totalNaturalDiamonds,
            totalLabGrownDiamonds,
            totalApprovedUser,
            totalInquiries,
            totalSearches,
        };
    }
};
DashboardService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map