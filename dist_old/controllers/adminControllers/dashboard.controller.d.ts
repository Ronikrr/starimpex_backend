import { NextFunction, Request, Response } from 'express';
export declare class DashboardController {
    private dashboardService;
    getDashboardStats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
