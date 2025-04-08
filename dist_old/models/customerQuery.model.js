"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerQueryModel = exports.CustomerQuery = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("./users.model");
const support_interface_1 = require("../interfaces/support.interface");
let CustomerQuery = class CustomerQuery {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ ref: users_model_1.User }),
    tslib_1.__metadata("design:type", Object)
], CustomerQuery.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], CustomerQuery.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ enum: support_interface_1.ESupportRequestStatus, default: support_interface_1.ESupportRequestStatus.PENDING }),
    tslib_1.__metadata("design:type", String)
], CustomerQuery.prototype, "status", void 0);
CustomerQuery = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1 }),
    (0, typegoose_1.index)({ status: 1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'customerQueries', timestamps: true } })
], CustomerQuery);
exports.CustomerQuery = CustomerQuery;
exports.CustomerQueryModel = (0, typegoose_1.getModelForClass)(CustomerQuery);
//# sourceMappingURL=customerQuery.model.js.map