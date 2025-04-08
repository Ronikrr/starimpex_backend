"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
const user_controller_1 = require("../../controllers/userControllers/user.controller");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const user_dto_1 = require("../../dtos/userDtos/user.dto");
class UserRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}self`, userAuth_middleware_1.default, this.userController.getUser);
        this.router.put(`${this.path}update-details`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(user_dto_1.UpdateUserDto), this.userController.editUser);
        this.router.post(`${this.path}change-password`, userAuth_middleware_1.default, this.userController.changePassword);
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map