import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Response } from 'express';
export declare class PriceTrackerController {
    private priceTrackerService;
    addToPriceTracker: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getPriceTrackList: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    removeFromPriceTracker: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
