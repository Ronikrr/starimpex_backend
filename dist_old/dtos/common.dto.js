"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsObjectIdDto = void 0;
const tslib_1 = require("tslib");
const regex_1 = require("../utils/regex");
const class_validator_1 = require("class-validator");
class ParamsObjectIdDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(regex_1.ID_REGEX),
    tslib_1.__metadata("design:type", String)
], ParamsObjectIdDto.prototype, "id", void 0);
exports.ParamsObjectIdDto = ParamsObjectIdDto;
//# sourceMappingURL=common.dto.js.map