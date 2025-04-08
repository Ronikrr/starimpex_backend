"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSearchListDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class GetSearchListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetSearchListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetSearchListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetSearchListDto.prototype, "fromDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetSearchListDto.prototype, "toDate", void 0);
exports.GetSearchListDto = GetSearchListDto;
//# sourceMappingURL=stats.dto.js.map