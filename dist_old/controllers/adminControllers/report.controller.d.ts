import { NextFunction, Request, Response } from 'express';
export declare class ReportController {
    private reportService;
    getReportExcel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
