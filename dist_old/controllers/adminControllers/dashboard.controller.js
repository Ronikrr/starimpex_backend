"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const tslib_1 = require("tslib");
const response_messages_1 = require("../../response/response.messages");
const dashboard_service_1 = require("../../services/adminServices/dashboard.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class DashboardController {
    constructor() {
        this.dashboardService = typedi_1.default.get(dashboard_service_1.DashboardService);
        this.getDashboardStats = async (req, res, next) => {
            try {
                const data = await this.dashboardService.getDashboardStats();
                res.success(response_messages_1.ResponseMessages.ADMIN_DASHBOARD_STATS_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map