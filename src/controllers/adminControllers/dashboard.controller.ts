import { ResponseMessages } from '@/response/response.messages';
import { DashboardService } from '@/services/adminServices/dashboard.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class DashboardController {
  private dashboardService = Container.get(DashboardService);

  public getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.dashboardService.getDashboardStats();

      res.success(ResponseMessages.ADMIN_DASHBOARD_STATS_FOUND, data);
    } catch (error) {
      next(error);
    }
  };
}
