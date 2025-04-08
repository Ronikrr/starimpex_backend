import { PAGE_LIMIT } from '@/config';
import { ResponseMessages } from '@/response/response.messages';
import { PurchaseService } from '@/services/adminServices/purchase.service';
import { filterPurchase } from '@/utils/filters/adminFilters';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class PurchaseController {
  private purchaseService = Container.get(PurchaseService);

  public createPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdPurchase = await this.purchaseService.createPurchase(req.body);

      res.success(ResponseMessages.PURCHASE_CREATE_SUCCESS, { purchase: filterPurchase(createdPurchase) });
    } catch (error) {
      next(error);
    }
  };

  public updatePurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedPurchase = await this.purchaseService.updatePurchase(req.body, req.params.id);

      res.success(ResponseMessages.PURCHASE_UPDATE_SUCCESS, { purchase: filterPurchase(updatedPurchase) });
    } catch (error) {
      next(error);
    }
  };

  public getPurchaseList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
      const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
      const orderId = req.query.orderId ? String(req.query.orderId) : null;

      const data = await this.purchaseService.getPurchaseList({ skip, limit, fromDate, toDate, orderId });

      res.success(ResponseMessages.PURCHASE_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public deletePurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.purchaseService.deletePurchase(req.params.id);

      res.success(ResponseMessages.PURCHASE_DELETE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public exportPurchasesExcel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseIds = req.body.purchaseIds;
      const buffer = await this.purchaseService.exportPurchasesExcel(purchaseIds);

      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };

  public getPurchaseDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseId = req.params.id;
      const { purchase, otherDetails } = await this.purchaseService.getPurchaseDetails(purchaseId);

      res.success(ResponseMessages.PURCHASE_FOUND, { purchase: { ...filterPurchase(purchase), ...otherDetails } });
    } catch (error) {
      next(error);
    }
  };
}
