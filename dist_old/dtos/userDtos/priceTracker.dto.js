"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFromPriceTrackerDto = exports.GetPriceTrackListDto = exports.AddToPriceTrackerDto = void 0;
const tslib_1 = require("tslib");
const regex_1 = require("../../utils/regex");
const class_validator_1 = require("class-validator");
class AddToPriceTrackerDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], AddToPriceTrackerDto.prototype, "diamondIds", void 0);
exports.AddToPriceTrackerDto = AddToPriceTrackerDto;
class GetPriceTrackListDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], GetPriceTrackListDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    tslib_1.__metadata("design:type", Number)
], GetPriceTrackListDto.prototype, "limit", void 0);
exports.GetPriceTrackListDto = GetPriceTrackListDto;
class RemoveFromPriceTrackerDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], RemoveFromPriceTrackerDto.prototype, "diamondIds", void 0);
exports.RemoveFromPriceTrackerDto = RemoveFromPriceTrackerDto;
//# sourceMappingURL=priceTracker.dto.js.map