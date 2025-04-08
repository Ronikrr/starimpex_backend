import { NextFunction, Request, Response } from 'express';
export declare class DiamondSourceController {
    private diamondSourceService;
    getDiamondSourceList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    enableDisableDiamondSource: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMarkupPercentage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
