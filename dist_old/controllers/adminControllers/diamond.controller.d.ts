import { NextFunction, Request, Response } from 'express';
export declare class DiamondController {
    private commonDiamondService;
    private diamondService;
    getDiamondList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDiamond: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    exportDiamondsToExcel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendDiamondExcelMail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    uploadViaFile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDiamondUploadFile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
