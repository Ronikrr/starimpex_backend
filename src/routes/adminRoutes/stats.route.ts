import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { StatsController } from '@/controllers/adminControllers/stats.controller';
import { GetSearchListDto } from '@/dtos/adminDtos/stats.dto';

export class StatsRoute implements Routes {
  public path = '/stats';
  public router = Router();
  public statsController = new StatsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/diamond-search`,
      authMiddleware,
      validationMiddleware(GetSearchListDto, 'query'),
      this.statsController.getDiamondSearchList,
    );
  }
}
