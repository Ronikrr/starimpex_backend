"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = exports.Purchase = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
let Purchase = class Purchase {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Purchase.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Date, required: true }),
    tslib_1.__metadata("design:type", Date)
], Purchase.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Purchase.prototype, "supplierName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Purchase.prototype, "supplierAddress", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Purchase.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Object, required: true }),
    tslib_1.__metadata("design:type", Array)
], Purchase.prototype, "items", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Purchase.prototype, "isDeleted", void 0);
Purchase = tslib_1.__decorate([
    (0, typegoose_1.index)({ date: -1 }),
    (0, typegoose_1.index)({ orderId: 1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'purchases', timestamps: true } })
], Purchase);
exports.Purchase = Purchase;
exports.PurchaseModel = (0, typegoose_1.getModelForClass)(Purchase);
//# sourceMappingURL=purchase.model.js.map