import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { DashboardService } from '@/services/userServices/dashboard.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class DashboardController {
  private dashboardService = Container.get(DashboardService);

  public getDashboardStats = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = await this.dashboardService.getDashboardStats(req.user);

      res.success(ResponseMessages.USER_DASHBOARD_STATS_FOUND, data);
    } catch (error) {
      next(error);
    }
  };
}
