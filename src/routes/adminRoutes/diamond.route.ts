import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ExportExcelDto, GetDiamondListDto, SendExcelMailDto } from '@/dtos/userDtos/diamond.dto';
import { ParamsObjectIdDto } from '@/dtos/common.dto';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import { DiamondController } from '@/controllers/adminControllers/diamond.controller';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

export class DiamondRoute implements Routes {
  public path = '/diamond';
  public router = Router();
  private diamondController = new DiamondController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetDiamondListDto, 'query'), this.diamondController.getDiamondList);
    this.router.get(`${this.path}/details/:id`, authMiddleware, validationMiddleware(ParamsObjectIdDto, 'params'), this.diamondController.getDiamond);
    this.router.post(`${this.path}/export`, authMiddleware, validationMiddleware(ExportExcelDto), this.diamondController.exportDiamondsToExcel);
    this.router.post(
      `${this.path}/send-excel-mail`,
      authMiddleware,
      validationMiddleware(SendExcelMailDto),
      this.diamondController.sendDiamondExcelMail,
    );
    this.router.post(`${this.path}/upload-via-file`, authMiddleware, upload.single('file'), this.diamondController.uploadViaFile);
    this.router.get(`${this.path}/upload-file/download`, authMiddleware, this.diamondController.getDiamondUploadFile);
  }
}
