"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMarkupPercentageDto = exports.EnableDisableSourceDto = void 0;
const tslib_1 = require("tslib");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const class_validator_1 = require("class-validator");
class EnableDisableSourceDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(diamonds_interface_1.ESourceType),
    tslib_1.__metadata("design:type", String)
], EnableDisableSourceDto.prototype, "sourceType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], EnableDisableSourceDto.prototype, "isDisabled", void 0);
exports.EnableDisableSourceDto = EnableDisableSourceDto;
class UpdateMarkupPercentageDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], UpdateMarkupPercentageDto.prototype, "markupPercentage", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(diamonds_interface_1.ESourceType),
    tslib_1.__metadata("design:type", String)
], UpdateMarkupPercentageDto.prototype, "sourceType", void 0);
exports.UpdateMarkupPercentageDto = UpdateMarkupPercentageDto;
//# sourceMappingURL=diamondSource.dto.js.map