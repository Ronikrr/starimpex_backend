"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeSupportRequestStatusDto = exports.GetFeedbackListDto = exports.GetHelpSupportListDto = exports.GetInquiryListDto = exports.GetContactListDto = void 0;
const tslib_1 = require("tslib");
const support_interface_1 = require("../../interfaces/support.interface");
const regex_1 = require("../../utils/regex");
const class_validator_1 = require("class-validator");
class GetContactListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetContactListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetContactListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetContactListDto.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(support_interface_1.ESupportRequestStatus),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetContactListDto.prototype, "status", void 0);
exports.GetContactListDto = GetContactListDto;
class GetInquiryListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetInquiryListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetInquiryListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetInquiryListDto.prototype, "search", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(support_interface_1.ESupportRequestStatus),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetInquiryListDto.prototype, "status", void 0);
exports.GetInquiryListDto = GetInquiryListDto;
class GetHelpSupportListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetHelpSupportListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetHelpSupportListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetHelpSupportListDto.prototype, "user", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(support_interface_1.ESupportRequestStatus),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetHelpSupportListDto.prototype, "status", void 0);
exports.GetHelpSupportListDto = GetHelpSupportListDto;
class GetFeedbackListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetFeedbackListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetFeedbackListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetFeedbackListDto.prototype, "user", void 0);
exports.GetFeedbackListDto = GetFeedbackListDto;
class ChangeSupportRequestStatusDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(support_interface_1.ESupportRequestStatus),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ChangeSupportRequestStatusDto.prototype, "status", void 0);
exports.ChangeSupportRequestStatusDto = ChangeSupportRequestStatusDto;
//# sourceMappingURL=support.dto.js.map