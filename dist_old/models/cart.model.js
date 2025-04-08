"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = exports.Cart = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
const diamonds_model_1 = require("./diamonds.model");
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
let Cart = class Cart {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], Cart.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: diamonds_model_1.Diamond }),
    tslib_1.__metadata("design:type", Object)
], Cart.prototype, "diamond", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Object }),
    tslib_1.__metadata("design:type", Object)
], Cart.prototype, "diamondSnapshot", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: diamonds_interface_1.EDiamondStatus, default: diamonds_interface_1.EDiamondStatus.AVAILABLE }),
    tslib_1.__metadata("design:type", String)
], Cart.prototype, "status", void 0);
Cart = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'carts', timestamps: true } })
], Cart);
exports.Cart = Cart;
exports.CartModel = (0, typegoose_1.getModelForClass)(Cart);
//# sourceMappingURL=cart.model.js.map