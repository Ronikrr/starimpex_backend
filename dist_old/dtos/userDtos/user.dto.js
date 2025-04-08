"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const tslib_1 = require("tslib");
const users_interface_1 = require("../../interfaces/users.interface");
const class_validator_1 = require("class-validator");
class UpdateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "state", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(60),
    (0, class_validator_1.MinLength)(2),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "telephoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(users_interface_1.EMessengerType),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "messengerType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "messengerIdNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "website", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "notes", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.dto.js.map