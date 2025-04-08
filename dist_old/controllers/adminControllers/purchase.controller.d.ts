import { NextFunction, Request, Response } from 'express';
export declare class PurchaseController {
    private purchaseService;
    createPurchase: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePurchase: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPurchaseList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePurchase: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    exportPurchasesExcel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPurchaseDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
