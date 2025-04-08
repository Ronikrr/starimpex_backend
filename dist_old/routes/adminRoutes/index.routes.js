"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_route_1 = require("./auth.route");
const dashboard_route_1 = require("./dashboard.route");
const diamond_route_1 = require("./diamond.route");
const diamondSource_route_1 = require("./diamondSource.route");
const notifications_route_1 = tslib_1.__importDefault(require("./notifications.route"));
const order_route_1 = require("./order.route");
const purchase_route_1 = require("./purchase.route");
const report_route_1 = require("./report.route");
const stats_route_1 = require("./stats.route");
const support_route_1 = require("./support.route");
const user_route_1 = require("./user.route");
const adminRoutes = [
    new auth_route_1.AuthRoute(),
    new user_route_1.UserRoute(),
    new diamondSource_route_1.DiamondSourceRoute(),
    new diamond_route_1.DiamondRoute(),
    new support_route_1.SupportRoute(),
    new order_route_1.OrderRoute(),
    new stats_route_1.StatsRoute(),
    new dashboard_route_1.DashboardRoute(),
    new notifications_route_1.default(),
    new purchase_route_1.PurchaseRoute(),
    new report_route_1.ReportRoute(),
];
exports.default = adminRoutes;
//# sourceMappingURL=index.routes.js.map