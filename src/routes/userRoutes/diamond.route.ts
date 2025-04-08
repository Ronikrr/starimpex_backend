import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/userAuth.middleware';
import { AddDiamondNotes, GetDiamondListDto, SaveDiamondSearchDto, ExportExcelDto, SendExcelMailDto } from '@/dtos/userDtos/diamond.dto';
import { DiamondController } from '@/controllers/userControllers/diamond.controller';
import { ParamsObjectIdDto } from '@/dtos/common.dto';

export class DiamondRoute implements Routes {
  public path = '/diamond';
  public router = Router();
  private diamondController = new DiamondController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetDiamondListDto, 'query'), this.diamondController.getDiamondList);
    this.router.get(`${this.path}/details/:id`, validationMiddleware(ParamsObjectIdDto, 'params'), this.diamondController.getDiamond);
    this.router.put(`${this.path}/notes/update`, authMiddleware, validationMiddleware(AddDiamondNotes), this.diamondController.addDiamondNotes);
    this.router.post(
      `${this.path}/search/save`,
      authMiddleware,
      validationMiddleware(SaveDiamondSearchDto),
      this.diamondController.saveDiamondSearch,
    );
    this.router.post(`${this.path}/export`, authMiddleware, validationMiddleware(ExportExcelDto), this.diamondController.exportDiamondsToExcel);
    this.router.post(
      `${this.path}/send-excel-mail`,
      authMiddleware,
      validationMiddleware(SendExcelMailDto),
      this.diamondController.sendDiamondExcelMail,
    );
    this.router.get(`${this.path}/certificate/:id`, validationMiddleware(ParamsObjectIdDto, 'params'), this.diamondController.getCertificate);
    this.router.get(`${this.path}/video/:id`, validationMiddleware(ParamsObjectIdDto, 'params'), this.diamondController.getVideo);
  }
}
