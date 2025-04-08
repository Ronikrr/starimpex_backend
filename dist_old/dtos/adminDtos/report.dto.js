"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReportDto = void 0;
const tslib_1 = require("tslib");
const report_interface_1 = require("../../interfaces/adminInterfaces/report.interface");
const class_validator_1 = require("class-validator");
class GetReportDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(report_interface_1.EReportType),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], GetReportDto.prototype, "reportType", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", Date)
], GetReportDto.prototype, "fromDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", Date)
], GetReportDto.prototype, "toDate", void 0);
exports.GetReportDto = GetReportDto;
//# sourceMappingURL=report.dto.js.map