"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const response_messages_1 = require("../../response/response.messages");
const user_service_1 = require("../../services/userServices/user.service");
const userFilters_1 = require("../../utils/filters/userFilters");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class UserController {
    constructor() {
        this.userService = typedi_1.default.get(user_service_1.UserService);
        this.getUser = async (req, res, next) => {
            try {
                res.success(response_messages_1.ResponseMessages.USER_FOUND, (0, userFilters_1.filterUser)(req.user));
            }
            catch (error) {
                next(error);
            }
        };
        this.editUser = async (req, res, next) => {
            try {
                const updatedUser = await this.userService.editUser(req.body, req.user);
                res.success(response_messages_1.ResponseMessages.USER_PROFILE_UPDATE_SUCCESS, (0, userFilters_1.filterUser)(updatedUser));
            }
            catch (error) {
                next(error);
            }
        };
        this.changePassword = async (req, res, next) => {
            try {
                await this.userService.changePassword(req.user);
                res.success(response_messages_1.ResponseMessages.SEND_EMAIL_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map