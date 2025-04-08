import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/userAuth.middleware';
import { DashboardController } from '@/controllers/userControllers/dashboard.controller';

export class DashboardRoute implements Routes {
  public path = '/dashboard';
  public router = Router();
  private dashboardController = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/stats`, authMiddleware, this.dashboardController.getDashboardStats);
  }
}
