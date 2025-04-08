"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const response_messages_1 = require("../../response/response.messages");
const auth_service_1 = require("../../services/adminServices/auth.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class AuthController {
    constructor() {
        this.authService = typedi_1.default.get(auth_service_1.AuthService);
        this.logIn = async (req, res, next) => {
            try {
                const data = req.body;
                const token = await this.authService.login(data);
                res.success(response_messages_1.ResponseMessages.LOGIN_SUCCESS, { token });
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                await this.authService.logout(req.body);
                res.success(response_messages_1.ResponseMessages.LOGOUT_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map