"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const tslib_1 = require("tslib");
const users_interface_1 = require("../interfaces/users.interface");
const typegoose_1 = require("@typegoose/typegoose");
let User = class User {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "telephoneNumber", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ enum: users_interface_1.EMessengerType }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "messengerType", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "messengerIdNumber", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "website", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ enum: users_interface_1.EUserStatus, default: users_interface_1.EUserStatus.PENDING }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "token", void 0);
User = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1 }),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'users', timestamps: true } })
], User);
exports.User = User;
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
//# sourceMappingURL=users.model.js.map