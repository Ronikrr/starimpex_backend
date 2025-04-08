import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
export declare class CustomerSupportController {
    private supportService;
    contactUs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    inquiry: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    feedback: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    helpSupport: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
