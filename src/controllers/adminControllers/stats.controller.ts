import { PAGE_LIMIT } from '@/config';
import { ResponseMessages } from '@/response/response.messages';
import { StatsService } from '@/services/adminServices/stats.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class StatsController {
  private statsService = Container.get(StatsService);

  public getDiamondSearchList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
      const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;

      const data = await this.statsService.getDiamondSearchList({ skip, limit, fromDate, toDate });

      res.success(ResponseMessages.DIAMOND_SEARCH_STATS_FOUND, data);
    } catch (error) {
      next(error);
    }
  };
}
