import { ReportController } from '@/controllers/adminControllers/report.controller';
import { GetReportDto } from '@/dtos/adminDtos/report.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class ReportRoute implements Routes {
  public path = '/report';
  public router = Router();
  private reportController = new ReportController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/export`, authMiddleware, validationMiddleware(GetReportDto, 'query'), this.reportController.getReportExcel);
  }
}
