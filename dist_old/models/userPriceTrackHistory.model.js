"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPriceTrackHistoryModel = exports.UserPriceTrackHistory = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
let UserPriceTrackHistory = class UserPriceTrackHistory {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], UserPriceTrackHistory.prototype, "stoneNos", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], UserPriceTrackHistory.prototype, "user", void 0);
UserPriceTrackHistory = tslib_1.__decorate([
    (0, typegoose_1.index)({ createdAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'userPriceTrackHistory', timestamps: true } })
], UserPriceTrackHistory);
exports.UserPriceTrackHistory = UserPriceTrackHistory;
exports.UserPriceTrackHistoryModel = (0, typegoose_1.getModelForClass)(UserPriceTrackHistory);
//# sourceMappingURL=userPriceTrackHistory.model.js.map