import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    private userService;
    getUserList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changeUserStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserCartHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserPriceTrackHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
