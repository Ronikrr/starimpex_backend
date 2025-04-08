"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpSupportDto = exports.FeedbackDto = exports.InquiryDto = exports.ContactUsDto = void 0;
const tslib_1 = require("tslib");
const support_interface_1 = require("../../interfaces/userInterfaces/support.interface");
const class_validator_1 = require("class-validator");
class ContactUsDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContactUsDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContactUsDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], ContactUsDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], ContactUsDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContactUsDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContactUsDto.prototype, "message", void 0);
exports.ContactUsDto = ContactUsDto;
class InquiryDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(support_interface_1.EOptionDiamondType),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "diamondType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InquiryDto.prototype, "message", void 0);
exports.InquiryDto = InquiryDto;
class FeedbackDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], FeedbackDto.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FeedbackDto.prototype, "comment", void 0);
exports.FeedbackDto = FeedbackDto;
class HelpSupportDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], HelpSupportDto.prototype, "message", void 0);
exports.HelpSupportDto = HelpSupportDto;
//# sourceMappingURL=support.dto.js.map