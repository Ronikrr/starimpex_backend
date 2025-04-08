"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const auth_dto_1 = require("../../dtos/userDtos/auth.dto");
const auth_controller_1 = require("../../controllers/userControllers/auth.controller");
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
class AuthRoute {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/signup`, (0, validation_middleware_1.default)(auth_dto_1.CreateUserDto), this.authController.signUp);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(auth_dto_1.LoginUserDto), this.authController.signIn);
        this.router.get(`${this.path}/logout`, userAuth_middleware_1.default, this.authController.logout);
        this.router.post(`${this.path}/forgot-password`, (0, validation_middleware_1.default)(auth_dto_1.ForgotPasswordDto), this.authController.forgotPassword);
        this.router.post(`${this.path}/reset-password`, (0, validation_middleware_1.default)(auth_dto_1.ResetPasswordDto), this.authController.resetPassword);
    }
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=auth.route.js.map