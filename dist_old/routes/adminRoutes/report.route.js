"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoute = void 0;
const tslib_1 = require("tslib");
const report_controller_1 = require("../../controllers/adminControllers/report.controller");
const report_dto_1 = require("../../dtos/adminDtos/report.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const express_1 = require("express");
class ReportRoute {
    constructor() {
        this.path = '/report';
        this.router = (0, express_1.Router)();
        this.reportController = new report_controller_1.ReportController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/export`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(report_dto_1.GetReportDto, 'query'), this.reportController.getReportExcel);
    }
}
exports.ReportRoute = ReportRoute;
//# sourceMappingURL=report.route.js.map