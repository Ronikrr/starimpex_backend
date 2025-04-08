"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const auth_service_1 = require("../../services/userServices/auth.service");
const response_messages_1 = require("../../response/response.messages");
const userFilters_1 = require("../../utils/filters/userFilters");
class AuthController {
    constructor() {
        this.authService = typedi_1.Container.get(auth_service_1.AuthService);
        this.signUp = async (req, res, next) => {
            try {
                const userData = req.body;
                await this.authService.signUp(userData);
                res.success(response_messages_1.ResponseMessages.SIGNUP_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.signIn = async (req, res, next) => {
            try {
                const userCredentials = req.body;
                const userData = await this.authService.signIn(userCredentials);
                const _a = (0, userFilters_1.filterUser)(userData), { token } = _a, user = tslib_1.__rest(_a, ["token"]);
                res.success(response_messages_1.ResponseMessages.LOGIN_SUCCESS, { user, token });
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                await this.authService.logout(req.user);
                res.success(response_messages_1.ResponseMessages.LOGOUT_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.forgotPassword = async (req, res, next) => {
            try {
                const data = req.body;
                await this.authService.forgotPassword(data);
                res.success(response_messages_1.ResponseMessages.SEND_EMAIL_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const data = req.body;
                await this.authService.resetPassword(data);
                res.success(response_messages_1.ResponseMessages.CHANGE_PASSWORD_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map