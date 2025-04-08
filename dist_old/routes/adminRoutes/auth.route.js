"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/adminControllers/auth.controller");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const auth_dto_1 = require("../../dtos/adminDtos/auth.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
class AuthRoute {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(auth_dto_1.LoginDto), this.authController.logIn);
        this.router.post(`${this.path}/logout`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(auth_dto_1.LogoutDto), this.authController.logout);
    }
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=auth.route.js.map