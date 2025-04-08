import { NextFunction, Request, Response } from 'express';
export declare class StatsController {
    private statsService;
    getDiamondSearchList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
