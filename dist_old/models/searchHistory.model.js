"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryModel = exports.SearchHistory = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
let SearchHistory = class SearchHistory {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], SearchHistory.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({}),
    tslib_1.__metadata("design:type", Object)
], SearchHistory.prototype, "filters", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], SearchHistory.prototype, "totalStones", void 0);
SearchHistory = tslib_1.__decorate([
    (0, typegoose_1.index)({ createdAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'searchHistory', timestamps: true } })
], SearchHistory);
exports.SearchHistory = SearchHistory;
exports.SearchHistoryModel = (0, typegoose_1.getModelForClass)(SearchHistory);
//# sourceMappingURL=searchHistory.model.js.map