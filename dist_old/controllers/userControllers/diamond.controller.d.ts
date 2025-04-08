import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
export declare class DiamondController {
    private diamondService;
    private userDiamondService;
    getDiamondList: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getDiamond: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addDiamondNotes: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    saveDiamondSearch: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    exportDiamondsToExcel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendDiamondExcelMail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCertificate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getVideo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
