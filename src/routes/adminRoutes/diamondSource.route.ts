import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { DiamondSourceController } from '@/controllers/adminControllers/diamondSource.controller';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import { EnableDisableSourceDto, UpdateMarkupPercentageDto } from '@/dtos/adminDtos/diamondSource.dto';

export class DiamondSourceRoute implements Routes {
  public path = '/diamond-source';
  public router = Router();
  public diamondSourceController = new DiamondSourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, this.diamondSourceController.getDiamondSourceList);
    this.router.put(
      `${this.path}/active`,
      authMiddleware,
      validationMiddleware(EnableDisableSourceDto),
      this.diamondSourceController.enableDisableDiamondSource,
    );
    this.router.put(
      `${this.path}/update-markup`,
      authMiddleware,
      validationMiddleware(UpdateMarkupPercentageDto),
      this.diamondSourceController.updateMarkupPercentage,
    );
  }
}
