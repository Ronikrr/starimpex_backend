"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const dashboard_controller_1 = require("../../controllers/adminControllers/dashboard.controller");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
class DashboardRoute {
    constructor() {
        this.path = '/dashboard';
        this.router = (0, express_1.Router)();
        this.dashboardController = new dashboard_controller_1.DashboardController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/stats`, adminAuth_middleware_1.default, this.dashboardController.getDashboardStats);
    }
}
exports.DashboardRoute = DashboardRoute;
//# sourceMappingURL=dashboard.route.js.map