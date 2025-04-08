"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTrackerModel = exports.PriceTracker = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
let PriceTracker = class PriceTracker {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], PriceTracker.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Object }),
    tslib_1.__metadata("design:type", Object)
], PriceTracker.prototype, "diamondSnapshot", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: diamonds_interface_1.EDiamondStatus, default: diamonds_interface_1.EDiamondStatus.AVAILABLE }),
    tslib_1.__metadata("design:type", String)
], PriceTracker.prototype, "status", void 0);
PriceTracker = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'priceTracker', timestamps: true } })
], PriceTracker);
exports.PriceTracker = PriceTracker;
exports.PriceTrackerModel = (0, typegoose_1.getModelForClass)(PriceTracker);
//# sourceMappingURL=priceTracker.model.js.map