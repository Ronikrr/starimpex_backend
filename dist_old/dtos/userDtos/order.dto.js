"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const tslib_1 = require("tslib");
const regex_1 = require("../../utils/regex");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
tslib_1.__decorate([
    (0, class_validator_1.Matches)(regex_1.ID_REGEX, { each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateOrderDto.prototype, "remarks", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateOrderDto.prototype, "isTermsAccepted", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=order.dto.js.map