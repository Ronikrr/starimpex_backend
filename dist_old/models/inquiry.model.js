"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryModel = exports.Inquiry = void 0;
const tslib_1 = require("tslib");
const support_interface_1 = require("../interfaces/support.interface");
const support_interface_2 = require("../interfaces/userInterfaces/support.interface");
const typegoose_1 = require("@typegoose/typegoose");
let Inquiry = class Inquiry {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, enum: support_interface_2.EOptionDiamondType }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "diamondType", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ enum: support_interface_1.ESupportRequestStatus, default: support_interface_1.ESupportRequestStatus.PENDING }),
    tslib_1.__metadata("design:type", String)
], Inquiry.prototype, "status", void 0);
Inquiry = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1 }),
    (0, typegoose_1.index)({ status: 1 }),
    (0, typegoose_1.index)({ firstName: 'text', lastName: 'text', phone: 'text', country: 'text', email: 'text', companyName: 'text' })
], Inquiry);
exports.Inquiry = Inquiry;
exports.InquiryModel = (0, typegoose_1.getModelForClass)(Inquiry);
//# sourceMappingURL=inquiry.model.js.map