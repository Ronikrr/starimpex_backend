"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPriceTrackHistoryListDto = exports.GetCartHistoryListDto = exports.ChangeUserStatusDto = exports.GetUserListDto = void 0;
const tslib_1 = require("tslib");
const users_interface_1 = require("../../interfaces/users.interface");
const class_validator_1 = require("class-validator");
class GetUserListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetUserListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetUserListDto.prototype, "limit", void 0);
exports.GetUserListDto = GetUserListDto;
class ChangeUserStatusDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(users_interface_1.EUserStatus),
    tslib_1.__metadata("design:type", String)
], ChangeUserStatusDto.prototype, "status", void 0);
exports.ChangeUserStatusDto = ChangeUserStatusDto;
class GetCartHistoryListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetCartHistoryListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetCartHistoryListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetCartHistoryListDto.prototype, "fromDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetCartHistoryListDto.prototype, "toDate", void 0);
exports.GetCartHistoryListDto = GetCartHistoryListDto;
class GetPriceTrackHistoryListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetPriceTrackHistoryListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetPriceTrackHistoryListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetPriceTrackHistoryListDto.prototype, "fromDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetPriceTrackHistoryListDto.prototype, "toDate", void 0);
exports.GetPriceTrackHistoryListDto = GetPriceTrackHistoryListDto;
//# sourceMappingURL=user.dto.js.map