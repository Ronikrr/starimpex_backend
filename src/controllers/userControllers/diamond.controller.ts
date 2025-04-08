import { PAGE_LIMIT } from '@/config';
import { EDiamondEyeClean } from '@/interfaces/diamonds.interface';
import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { DiamondService as CommonDiamondService } from '@/services/diamond.service';
import { UserDiamondService } from '@/services/userServices/diamond.service';
import { filterDiamond } from '@/utils/filters/userFilters';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class DiamondController {
  private diamondService = Container.get(CommonDiamondService);
  private userDiamondService = Container.get(UserDiamondService);

  public getDiamondList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const diamondType = req.query.diamondType ? String(req.query.diamondType) : null;
      const shapeList = req.query.shapeList ? (JSON.parse(String(req.query.shapeList)) as Array<string>) : null;
      const labList = req.query.labList ? (JSON.parse(String(req.query.labList)) as Array<string>) : null;
      const caratWeightList = req.query.caratWeightList ? (JSON.parse(String(req.query.caratWeightList)) as Array<any>) : null;
      const colorList = req.query.colorList ? (JSON.parse(String(req.query.colorList)) as Array<string>) : null;
      const noBGM = req.query.noBGM ? req.query.noBGM === 'true' : null;
      const isFancyColor = req.query.isFancyColor ? req.query.isFancyColor === 'true' : null;
      const fancyColorList = req.query.fancyColorList ? (JSON.parse(String(req.query.fancyColorList)) as Array<string>) : null;
      const fancyIntensityList = req.query.fancyIntensityList ? (JSON.parse(String(req.query.fancyIntensityList)) as Array<string>) : null;
      const fancyOvertoneList = req.query.fancyOvertoneList ? (JSON.parse(String(req.query.fancyOvertoneList)) as Array<string>) : null;
      const clarityList = req.query.clarityList ? (JSON.parse(String(req.query.clarityList)) as Array<string>) : null;
      const cutList = req.query.cutList ? (JSON.parse(String(req.query.cutList)) as Array<string>) : null;
      const polishList = req.query.polishList ? (JSON.parse(String(req.query.polishList)) as Array<string>) : null;
      const symmetryList = req.query.symmetryList ? (JSON.parse(String(req.query.symmetryList)) as Array<string>) : null;
      const florescenceList = req.query.florescenceList ? (JSON.parse(String(req.query.florescenceList)) as Array<string>) : null;
      const countryList = req.query.countryList ? (JSON.parse(String(req.query.countryList)) as Array<string>) : null;
      const eyeCleanList = req.query.eyeCleanList ? (JSON.parse(String(req.query.eyeCleanList)) as Array<EDiamondEyeClean>) : null;
      const typeList = req.query.typeList ? (JSON.parse(String(req.query.typeList)) as Array<string>) : null;
      const discountRange = req.query.discountRange ? JSON.parse(String(req.query.discountRange)) : null;
      const pricePerCaratRange = req.query.pricePerCaratRange ? JSON.parse(String(req.query.pricePerCaratRange)) : null;
      const totalPriceRange = req.query.totalPriceRange ? JSON.parse(String(req.query.totalPriceRange)) : null;
      const tablePercentageRange = req.query.tablePercentageRange ? JSON.parse(String(req.query.tablePercentageRange)) : null;
      const depthPercentageRange = req.query.depthPercentageRange ? JSON.parse(String(req.query.depthPercentageRange)) : null;
      const lengthRange = req.query.lengthRange ? JSON.parse(String(req.query.lengthRange)) : null;
      const widthRange = req.query.widthRange ? JSON.parse(String(req.query.widthRange)) : null;
      const ratioRange = req.query.ratioRange ? JSON.parse(String(req.query.ratioRange)) : null;
      const crownHeightRange = req.query.crownHeightRange ? JSON.parse(String(req.query.crownHeightRange)) : null;
      const crownAngleRange = req.query.crownAngleRange ? JSON.parse(String(req.query.crownAngleRange)) : null;
      const pavilionHeightRange = req.query.pavilionHeightRange ? JSON.parse(String(req.query.pavilionHeightRange)) : null;
      const pavilionAngleRange = req.query.pavilionAngleRange ? JSON.parse(String(req.query.pavilionAngleRange)) : null;
      const girdlePercentageRange = req.query.girdlePercentageRange ? JSON.parse(String(req.query.girdlePercentageRange)) : null;
      const culetSizeList = req.query.culetSizeList ? JSON.parse(String(req.query.culetSizeList)) : null;
      const keyToSymbolIncludeList = req.query.keyToSymbolIncludeList ? JSON.parse(String(req.query.keyToSymbolIncludeList)) : null;
      const keyToSymbolExcludeList = req.query.keyToSymbolExcludeList ? JSON.parse(String(req.query.keyToSymbolExcludeList)) : null;
      const limit = req.query.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const stoneIds = req.query.stoneIds ? String(req.query.stoneIds) : '';
      const sortOrder = req.query.sortOrder ? JSON.parse(String(req.query.sortOrder)) : null;

      const data = await this.diamondService.getDiamondList(
        {
          diamondType,
          shapeList,
          labList,
          caratWeightList,
          colorList,
          noBGM,
          isFancyColor,
          fancyColorList,
          fancyIntensityList,
          fancyOvertoneList,
          clarityList,
          cutList,
          polishList,
          symmetryList,
          florescenceList,
          countryList,
          eyeCleanList,
          typeList,
          discountRange,
          pricePerCaratRange,
          totalPriceRange,
          tablePercentageRange,
          depthPercentageRange,
          lengthRange,
          widthRange,
          ratioRange,
          crownHeightRange,
          crownAngleRange,
          pavilionHeightRange,
          pavilionAngleRange,
          girdlePercentageRange,
          culetSizeList,
          keyToSymbolIncludeList,
          keyToSymbolExcludeList,
          limit,
          skip,
          stoneIds,
          sortOrder,
        },
        req.user,
      );

      res.success(ResponseMessages.DIAMOND_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getDiamond = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const diamond = await this.diamondService.getDiamond(req.params.id);

      res.success(ResponseMessages.DIAMOND_FOUND, filterDiamond(diamond));
    } catch (error) {
      next(error);
    }
  };

  public addDiamondNotes = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      await this.userDiamondService.addDiamondNotes(data, req.user);

      res.success(ResponseMessages.DIAMOND_NOTES_UPDATE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public saveDiamondSearch = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const filters = req.body.filters;
      await this.userDiamondService.saveDiamondSearch(filters, req.user);

      res.success(ResponseMessages.USER_DIAMOND_SEARCH_SAVE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public exportDiamondsToExcel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const diamondIds = req.body.diamondIds;
      const buffer = await this.diamondService.exportDiamondsToExcel(diamondIds);

      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };

  public sendDiamondExcelMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.diamondService.sendDiamondExcelMail(req.body);

      res.success(ResponseMessages.SEND_EMAIL_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public getCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.diamondService.getCertificate(req.params.id);

      res.success(ResponseMessages.DIAMOND_CERTIFICATE_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.diamondService.getVideo(req.params.id);

      res.success(ResponseMessages.DIAMOND_VIDEO_FOUND, data);
    } catch (error) {
      next(error);
    }
  };
}
