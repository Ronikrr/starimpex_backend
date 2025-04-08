"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const user_service_1 = require("../../services/adminServices/user.service");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class UserController {
    constructor() {
        this.userService = typedi_1.default.get(user_service_1.UserService);
        this.getUserList = async (req, res, next) => {
            var _a, _b;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const data = await this.userService.getUserList({ limit, skip });
                res.success(response_messages_1.ResponseMessages.USER_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.changeUserStatus = async (req, res, next) => {
            try {
                const userId = req.params.id;
                const data = req.body;
                const user = await this.userService.changeUserStatus(userId, data);
                res.success(response_messages_1.ResponseMessages.USER_UPDATE_SUCCESS, { user: (0, adminFilters_1.filterUser)(user) });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUser = async (req, res, next) => {
            try {
                const userId = req.params.id;
                const user = await this.userService.getUser(userId);
                res.success(response_messages_1.ResponseMessages.USER_FOUND, (0, adminFilters_1.filterUser)(user));
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserCartHistory = async (req, res, next) => {
            var _a, _b;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
                const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
                const data = await this.userService.getUserCartHistory({ limit, skip, fromDate, toDate });
                res.success(response_messages_1.ResponseMessages.CART_ITEM_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserPriceTrackHistory = async (req, res, next) => {
            var _a, _b;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
                const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
                const data = await this.userService.getUserPriceTrackHistory({ limit, skip, fromDate, toDate });
                res.success(response_messages_1.ResponseMessages.PRICE_TRACK_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map