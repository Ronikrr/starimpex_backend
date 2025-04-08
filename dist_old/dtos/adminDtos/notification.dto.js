"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNotificationDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class GetNotificationDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetNotificationDto.prototype, "skip", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GetNotificationDto.prototype, "limit", void 0);
exports.GetNotificationDto = GetNotificationDto;
//# sourceMappingURL=notification.dto.js.map