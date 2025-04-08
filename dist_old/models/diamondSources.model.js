"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondSourceModel = exports.DiamondSource = void 0;
const tslib_1 = require("tslib");
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
const typegoose_1 = require("@typegoose/typegoose");
let DiamondSource = class DiamondSource {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, unique: true, enum: diamonds_interface_1.ESourceType }),
    tslib_1.__metadata("design:type", String)
], DiamondSource.prototype, "sourceType", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], DiamondSource.prototype, "markupPercentage", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], DiamondSource.prototype, "isDisabled", void 0);
DiamondSource = tslib_1.__decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'diamondSources', timestamps: true } })
], DiamondSource);
exports.DiamondSource = DiamondSource;
exports.DiamondSourceModel = (0, typegoose_1.getModelForClass)(DiamondSource);
//# sourceMappingURL=diamondSources.model.js.map