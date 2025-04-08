"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutDto = exports.LoginDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class LoginDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "fcmToken", void 0);
exports.LoginDto = LoginDto;
class LogoutDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], LogoutDto.prototype, "fcmToken", void 0);
exports.LogoutDto = LogoutDto;
//# sourceMappingURL=auth.dto.js.map