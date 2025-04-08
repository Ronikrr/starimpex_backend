import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Response } from 'express';
export declare class DashboardController {
    private dashboardService;
    getDashboardStats: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
