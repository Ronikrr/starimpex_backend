"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const cart_service_1 = require("../../services/userServices/cart.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class UserCartController {
    constructor() {
        this.userCartService = typedi_1.default.get(cart_service_1.UserCartService);
        this.addToCart = async (req, res, next) => {
            try {
                const diamondIds = req.body.itemIds;
                const data = await this.userCartService.addToCart(diamondIds, req.user);
                res.success(response_messages_1.ResponseMessages.ADD_TO_CART_SUCCESS, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCartItem = async (req, res, next) => {
            try {
                const diamondIds = req.body.itemIds;
                await this.userCartService.deleteCartItem(diamondIds, req.user);
                res.success(response_messages_1.ResponseMessages.CART_ITEM_DELETE_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.getCartItems = async (req, res, next) => {
            var _a, _b;
            try {
                const skip = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.skip) ? Number(req.query.skip) : 0;
                const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const data = await this.userCartService.getCartItemList({ skip, limit }, req.user);
                res.success(response_messages_1.ResponseMessages.CART_ITEM_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserCartController = UserCartController;
//# sourceMappingURL=cart.controller.js.map