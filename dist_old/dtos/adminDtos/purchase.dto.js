"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportPurchasesExcelDto = exports.GetPurchaseListDto = exports.UpdatePurchaseDto = exports.CreatePurchaseDto = exports.PurchaseItem = void 0;
const tslib_1 = require("tslib");
const regex_1 = require("../../utils/regex");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PurchaseItem {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PurchaseItem.prototype, "stoneId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], PurchaseItem.prototype, "finalRap", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], PurchaseItem.prototype, "finalDiscount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], PurchaseItem.prototype, "finalPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], PurchaseItem.prototype, "finalTotalPrice", void 0);
exports.PurchaseItem = PurchaseItem;
class CreatePurchaseDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreatePurchaseDto.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Date)
], CreatePurchaseDto.prototype, "date", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreatePurchaseDto.prototype, "supplierName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreatePurchaseDto.prototype, "supplierAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreatePurchaseDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PurchaseItem),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreatePurchaseDto.prototype, "items", void 0);
exports.CreatePurchaseDto = CreatePurchaseDto;
class UpdatePurchaseDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdatePurchaseDto.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Date)
], UpdatePurchaseDto.prototype, "date", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdatePurchaseDto.prototype, "supplierName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdatePurchaseDto.prototype, "supplierAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdatePurchaseDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PurchaseItem),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], UpdatePurchaseDto.prototype, "items", void 0);
exports.UpdatePurchaseDto = UpdatePurchaseDto;
class GetPurchaseListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetPurchaseListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetPurchaseListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetPurchaseListDto.prototype, "fromDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], GetPurchaseListDto.prototype, "toDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetPurchaseListDto.prototype, "orderId", void 0);
exports.GetPurchaseListDto = GetPurchaseListDto;
class ExportPurchasesExcelDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], ExportPurchasesExcelDto.prototype, "purchaseIds", void 0);
exports.ExportPurchasesExcelDto = ExportPurchasesExcelDto;
//# sourceMappingURL=purchase.dto.js.map