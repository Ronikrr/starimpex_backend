"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth.route");
const cart_route_1 = require("./cart.route");
const dashboard_route_1 = require("./dashboard.route");
const diamond_route_1 = require("./diamond.route");
const order_route_1 = require("./order.route");
const priceTracker_route_1 = require("./priceTracker.route");
const support_route_1 = require("./support.route");
const user_route_1 = require("./user.route");
const userRoutes = [
    new auth_route_1.AuthRoute(),
    new support_route_1.CustomerSupportRoute(),
    new diamond_route_1.DiamondRoute(),
    new cart_route_1.UserCartRoute(),
    new order_route_1.OrderRoute(),
    new dashboard_route_1.DashboardRoute(),
    new priceTracker_route_1.PriceTrackerRoute(),
    new user_route_1.UserRoute(),
];
exports.default = userRoutes;
//# sourceMappingURL=index.routes.js.map