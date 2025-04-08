"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondModel = exports.Diamond = void 0;
const tslib_1 = require("tslib");
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
const typegoose_1 = require("@typegoose/typegoose");
let Diamond = class Diamond {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "uniqueStoneId", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: diamonds_interface_1.EDiamondType }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "diamondType", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "stoneNo", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: diamonds_interface_1.ESourceType }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "source", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "lab", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "inscription", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "shape", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "caratWeight", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "pricePerCarat", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "color", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "fancyColor", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "fancyIntensity", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "fancyOvertone", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean }),
    tslib_1.__metadata("design:type", Boolean)
], Diamond.prototype, "noBGM", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "clarity", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "cut", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "polish", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "symmetry", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "florescence", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "region", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "shade", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "luster", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "eyeClean", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "milky", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "inclusion", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "extraFacet", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "internalGraining", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "surfaceGraining", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean }),
    tslib_1.__metadata("design:type", Boolean)
], Diamond.prototype, "heartsAndArrows", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "measurement", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "length", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "width", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "height", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "depthPercentage", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "tablePercentage", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "crownAngle", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "crownHeight", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "pavilionAngle", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "pavilionHeight", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "starLength", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "lowerHalves", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "girdleType", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "girdlePercentage", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "culetSize", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "ratio", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "videoLink", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "imageLink", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "certificateLink", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "certificateComment", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "motibaGemsComment", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "rap", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "ourPrice", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Diamond.prototype, "ourDiscount", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Object }),
    tslib_1.__metadata("design:type", Object)
], Diamond.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Diamond.prototype, "isDeleted", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", Array)
], Diamond.prototype, "keyToSymbol", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: diamonds_interface_1.EDiamondStatus, default: diamonds_interface_1.EDiamondStatus.AVAILABLE }),
    tslib_1.__metadata("design:type", String)
], Diamond.prototype, "status", void 0);
Diamond = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1, pricePerCarat: 1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'diamonds', timestamps: true } })
], Diamond);
exports.Diamond = Diamond;
exports.DiamondModel = (0, typegoose_1.getModelForClass)(Diamond);
//# sourceMappingURL=diamonds.model.js.map