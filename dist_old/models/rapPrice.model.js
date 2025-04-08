"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RapPriceModel = exports.RapPrice = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
let RapPrice = class RapPrice {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], RapPrice.prototype, "shape", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], RapPrice.prototype, "lowSize", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], RapPrice.prototype, "highSize", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], RapPrice.prototype, "color", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], RapPrice.prototype, "clarity", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], RapPrice.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Date }),
    tslib_1.__metadata("design:type", String)
], RapPrice.prototype, "rapDate", void 0);
RapPrice = tslib_1.__decorate([
    (0, typegoose_1.index)({ rapDate: -1, lowSize: -1, highSize: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'rapPrice', timestamps: true } })
], RapPrice);
exports.RapPrice = RapPrice;
exports.RapPriceModel = (0, typegoose_1.getModelForClass)(RapPrice);
//# sourceMappingURL=rapPrice.model.js.map