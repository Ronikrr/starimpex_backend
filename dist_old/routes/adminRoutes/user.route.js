"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_controller_1 = require("../../controllers/adminControllers/user.controller");
const user_dto_1 = require("../../dtos/adminDtos/user.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const common_dto_1 = require("../../dtos/common.dto");
class UserRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(user_dto_1.GetUserListDto, 'query'), this.userController.getUserList);
        this.router.put(`${this.path}/change-status/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(user_dto_1.ChangeUserStatusDto), this.userController.changeUserStatus);
        this.router.get(`${this.path}/cart-history`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(user_dto_1.GetCartHistoryListDto, 'query'), this.userController.getUserCartHistory);
        this.router.get(`${this.path}/price-track-history`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(user_dto_1.GetPriceTrackHistoryListDto, 'query'), this.userController.getUserPriceTrackHistory);
        this.router.get(`${this.path}/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.userController.getUser);
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map