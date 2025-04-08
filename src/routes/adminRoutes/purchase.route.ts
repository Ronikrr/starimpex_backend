import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { PurchaseController } from '@/controllers/adminControllers/purchase.controller';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import { CreatePurchaseDto, ExportPurchasesExcelDto, GetPurchaseListDto, UpdatePurchaseDto } from '@/dtos/adminDtos/purchase.dto';
import { ParamsObjectIdDto } from '@/dtos/common.dto';

export class PurchaseRoute implements Routes {
  public path = '/purchase';
  public router = Router();
  private purchaseController = new PurchaseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, validationMiddleware(CreatePurchaseDto), this.purchaseController.createPurchase);
    this.router.put(
      `${this.path}/update/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(UpdatePurchaseDto),
      this.purchaseController.updatePurchase,
    );
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetPurchaseListDto, 'query'), this.purchaseController.getPurchaseList);
    this.router.delete(`${this.path}/:id`, authMiddleware, validationMiddleware(ParamsObjectIdDto, 'params'), this.purchaseController.deletePurchase);
    this.router.post(
      `${this.path}/export`,
      authMiddleware,
      validationMiddleware(ExportPurchasesExcelDto),
      this.purchaseController.exportPurchasesExcel,
    );
    this.router.get(
      `${this.path}/details/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      this.purchaseController.getPurchaseDetails,
    );
  }
}
