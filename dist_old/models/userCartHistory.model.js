"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartHistoryModel = exports.UserCartHistory = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
let UserCartHistory = class UserCartHistory {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], UserCartHistory.prototype, "stoneNos", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], UserCartHistory.prototype, "user", void 0);
UserCartHistory = tslib_1.__decorate([
    (0, typegoose_1.index)({ createdAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'userCartHistory', timestamps: true } })
], UserCartHistory);
exports.UserCartHistory = UserCartHistory;
exports.UserCartHistoryModel = (0, typegoose_1.getModelForClass)(UserCartHistory);
//# sourceMappingURL=userCartHistory.model.js.map