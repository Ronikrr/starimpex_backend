import { PAGE_LIMIT } from '@/config';
import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { PriceTrackerService } from '@/services/userServices/priceTracker.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class PriceTrackerController {
  private priceTrackerService = Container.get(PriceTrackerService);

  public addToPriceTracker = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.priceTrackerService.addToPriceTracker(req.body, req.user);

      res.success(ResponseMessages.PRICE_TRACKER_ADD_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public getPriceTrackList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;

      const data = await this.priceTrackerService.getPriceTrackList({ skip, limit }, req.user);

      res.success(ResponseMessages.PRICE_TRACK_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public removeFromPriceTracker = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.priceTrackerService.removeFromPriceTracker(req.body, req.user);

      res.success(ResponseMessages.PRICE_TRACK_REMOVE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
