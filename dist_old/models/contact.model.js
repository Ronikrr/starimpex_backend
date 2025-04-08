"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = exports.Contact = void 0;
const tslib_1 = require("tslib");
const support_interface_1 = require("../interfaces/support.interface");
const typegoose_1 = require("@typegoose/typegoose");
let Contact = class Contact {
};
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typegoose_1.prop)({ enum: support_interface_1.ESupportRequestStatus, default: support_interface_1.ESupportRequestStatus.PENDING }),
    tslib_1.__metadata("design:type", String)
], Contact.prototype, "status", void 0);
Contact = tslib_1.__decorate([
    (0, typegoose_1.index)({ updatedAt: -1 }),
    (0, typegoose_1.index)({ status: 1 }),
    (0, typegoose_1.index)({ firstName: 'text', lastName: 'text', phone: 'text', country: 'text', email: 'text' })
], Contact);
exports.Contact = Contact;
exports.ContactModel = (0, typegoose_1.getModelForClass)(Contact);
//# sourceMappingURL=contact.model.js.map