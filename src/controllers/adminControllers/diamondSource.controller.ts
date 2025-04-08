import { ResponseMessages } from '@/response/response.messages';
import { DiamondSourceService } from '@/services/adminServices/diamondSource.service';
import { filterDiamondSource } from '@/utils/filters/adminFilters';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class DiamondSourceController {
  private diamondSourceService = Container.get(DiamondSourceService);

  public getDiamondSourceList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.diamondSourceService.getDiamondSourceList();

      res.success(ResponseMessages.DIAMOND_SOURCE_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public enableDisableDiamondSource = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = req.body;
      const data = await this.diamondSourceService.enableDisableDiamondSource(getData);

      res.success(
        getData.isDisabled ? ResponseMessages.DIAMOND_SOURCE_DISABLED_SUCCESS : ResponseMessages.DIAMOND_SOURCE_ENABLED_SUCCESS,
        filterDiamondSource(data),
      );
    } catch (error) {
      next(error);
    }
  };

  public updateMarkupPercentage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = req.body;
      const data = await this.diamondSourceService.updateMarkupPercentage(getData);

      res.success(ResponseMessages.DIAMOND_SOURCE_UPDATE_SUCCESS, filterDiamondSource(data));
    } catch (error) {
      next(error);
    }
  };
}
