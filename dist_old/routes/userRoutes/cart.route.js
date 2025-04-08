"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
const cart_controller_1 = require("../../controllers/userControllers/cart.controller");
const cart_dto_1 = require("../../dtos/userDtos/cart.dto");
class UserCartRoute {
    constructor() {
        this.path = '/cart';
        this.router = (0, express_1.Router)();
        this.userCartController = new cart_controller_1.UserCartController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/add`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(cart_dto_1.AddToCartDto), this.userCartController.addToCart);
        this.router.delete(`${this.path}/remove`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(cart_dto_1.DeleteFromCartDto), this.userCartController.deleteCartItem);
        this.router.get(`${this.path}/list`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(cart_dto_1.GetCartItemListDto, 'query'), this.userCartController.getCartItems);
    }
}
exports.UserCartRoute = UserCartRoute;
//# sourceMappingURL=cart.route.js.map