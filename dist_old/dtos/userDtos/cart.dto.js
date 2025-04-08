"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFromCartDto = exports.AddToCartDto = exports.GetCartItemListDto = void 0;
const tslib_1 = require("tslib");
const regex_1 = require("../../utils/regex");
const class_validator_1 = require("class-validator");
class GetCartItemListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], GetCartItemListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], GetCartItemListDto.prototype, "limit", void 0);
exports.GetCartItemListDto = GetCartItemListDto;
class AddToCartDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], AddToCartDto.prototype, "itemIds", void 0);
exports.AddToCartDto = AddToCartDto;
class DeleteFromCartDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], DeleteFromCartDto.prototype, "itemIds", void 0);
exports.DeleteFromCartDto = DeleteFromCartDto;
//# sourceMappingURL=cart.dto.js.map