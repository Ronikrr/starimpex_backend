"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const tslib_1 = require("tslib");
const report_service_1 = require("../../services/adminServices/report.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class ReportController {
    constructor() {
        this.reportService = typedi_1.default.get(report_service_1.ReportService);
        this.getReportExcel = async (req, res, next) => {
            try {
                const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
                const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
                const reportType = req.query.reportType ? String(req.query.reportType) : null;
                const buffer = await this.reportService.getReportExcel({ fromDate, toDate, reportType });
                res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.set('Content-Disposition', `attachment; filename=${reportType}-report.xlsx`);
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map