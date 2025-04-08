import { PriceTrackerController } from '@/controllers/userControllers/priceTracker.controller';
import { AddToPriceTrackerDto, GetPriceTrackListDto, RemoveFromPriceTrackerDto } from '@/dtos/userDtos/priceTracker.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/userAuth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class PriceTrackerRoute implements Routes {
  public path = '/price-track';
  public router = Router();
  private priceTrackerController = new PriceTrackerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add`, authMiddleware, validationMiddleware(AddToPriceTrackerDto), this.priceTrackerController.addToPriceTracker);
    this.router.get(
      `${this.path}/list`,
      authMiddleware,
      validationMiddleware(GetPriceTrackListDto, 'query'),
      this.priceTrackerController.getPriceTrackList,
    );
    this.router.delete(
      `${this.path}/remove`,
      authMiddleware,
      validationMiddleware(RemoveFromPriceTrackerDto),
      this.priceTrackerController.removeFromPriceTracker,
    );
  }
}
