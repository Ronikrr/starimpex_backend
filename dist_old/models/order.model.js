"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.Order = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
const order_interface_1 = require("../interfaces/order.interface");
let Order = class Order {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: (Array) }),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "items", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "remarks", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "shippingCharge", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: (Array) }),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "additionalCharges", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "grossAmount", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "totalStones", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "totalCarats", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean }),
    tslib_1.__metadata("design:type", Boolean)
], Order.prototype, "isTermsAccepted", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: order_interface_1.EOrderStatus, default: order_interface_1.EOrderStatus.PENDING }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Order.prototype, "isManualOrder", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "companyEmail", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "description", void 0);
Order = tslib_1.__decorate([
    (0, typegoose_1.index)({ createdAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'orders', timestamps: true } })
], Order);
exports.Order = Order;
exports.OrderModel = (0, typegoose_1.getModelForClass)(Order);
//# sourceMappingURL=order.model.js.map