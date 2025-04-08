"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportOrdersExcelDto = exports.GetOrderListDto = void 0;
const tslib_1 = require("tslib");
const regex_1 = require("../utils/regex");
const class_validator_1 = require("class-validator");
class GetOrderListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetOrderListDto.prototype, "orderNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetOrderListDto.prototype, "fromOrderDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetOrderListDto.prototype, "toOrderDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "fromAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "toAmount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "fromTotalItems", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "toTotalItems", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "fromCarats", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetOrderListDto.prototype, "toCarats", void 0);
exports.GetOrderListDto = GetOrderListDto;
class ExportOrdersExcelDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], ExportOrdersExcelDto.prototype, "orderIds", void 0);
exports.ExportOrdersExcelDto = ExportOrdersExcelDto;
//# sourceMappingURL=order.dto.js.map