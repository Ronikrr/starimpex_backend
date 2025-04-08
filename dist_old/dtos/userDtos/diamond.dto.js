"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendExcelMailDto = exports.ExportExcelDto = exports.SaveDiamondSearchDto = exports.AddDiamondNotes = exports.DiamondNotes = exports.GetDiamondListDto = exports.NumberRangeOption = void 0;
const tslib_1 = require("tslib");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const class_validator_1 = require("class-validator");
const is_string_array_decorator_1 = require("../decorators/is.string.array.decorator");
const is_string_object_decorator_1 = require("../decorators/is.string.object.decorator");
const regex_1 = require("../../utils/regex");
const class_transformer_1 = require("class-transformer");
class NumberRangeOption {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], NumberRangeOption.prototype, "from", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], NumberRangeOption.prototype, "to", void 0);
exports.NumberRangeOption = NumberRangeOption;
class GetDiamondListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(diamonds_interface_1.EDiamondType),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetDiamondListDto.prototype, "diamondType", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "shapeList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "labList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArrayNumberRangeObject)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "caratWeightList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "colorList", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], GetDiamondListDto.prototype, "noBGM", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], GetDiamondListDto.prototype, "isFancyColor", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "fancyColorList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "fancyIntensityList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "fancyOvertoneList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "clarityList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "cutList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "polishList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "symmetryList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "florescenceList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "countryList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "eyeCleanList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "typeList", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "discountRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "pricePerCaratRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "totalPriceRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "tablePercentageRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "depthPercentageRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "lengthRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "widthRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "ratioRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "crownHeightRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "crownAngleRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "pavilionHeightRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "pavilionAngleRange", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectNumberRange)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", NumberRangeOption)
], GetDiamondListDto.prototype, "girdlePercentageRange", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "culetSizeList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "keyToSymbolIncludeList", void 0);
tslib_1.__decorate([
    (0, is_string_array_decorator_1.IsStringQueryArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], GetDiamondListDto.prototype, "keyToSymbolExcludeList", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetDiamondListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetDiamondListDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], GetDiamondListDto.prototype, "stoneIds", void 0);
tslib_1.__decorate([
    (0, is_string_object_decorator_1.IsStringQueryObjectSortOrder)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], GetDiamondListDto.prototype, "sortOrder", void 0);
exports.GetDiamondListDto = GetDiamondListDto;
class DiamondNotes {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], DiamondNotes.prototype, "diamondId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], DiamondNotes.prototype, "notes", void 0);
exports.DiamondNotes = DiamondNotes;
class AddDiamondNotes {
}
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DiamondNotes),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], AddDiamondNotes.prototype, "diamondNotes", void 0);
exports.AddDiamondNotes = AddDiamondNotes;
class SaveDiamondSearchDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    tslib_1.__metadata("design:type", Object)
], SaveDiamondSearchDto.prototype, "filters", void 0);
exports.SaveDiamondSearchDto = SaveDiamondSearchDto;
class ExportExcelDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", String)
], ExportExcelDto.prototype, "diamondIds", void 0);
exports.ExportExcelDto = ExportExcelDto;
class SendExcelMailDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", String)
], SendExcelMailDto.prototype, "diamondIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], SendExcelMailDto.prototype, "email", void 0);
exports.SendExcelMailDto = SendExcelMailDto;
//# sourceMappingURL=diamond.dto.js.map