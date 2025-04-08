import { ReportService } from '@/services/adminServices/report.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class ReportController {
  private reportService = Container.get(ReportService);

  public getReportExcel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
      const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
      const reportType = req.query.reportType ? String(req.query.reportType) : null;

      const buffer = await this.reportService.getReportExcel({ fromDate, toDate, reportType });

      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', `attachment; filename=${reportType}-report.xlsx`);
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };
}
