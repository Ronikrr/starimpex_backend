"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerModel = exports.Tracker = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
class Tracker {
}
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Tracker.prototype, "lastOrderIncrement", void 0);
exports.Tracker = Tracker;
exports.TrackerModel = (0, typegoose_1.getModelForClass)(Tracker);
//# sourceMappingURL=tracker.model.js.map