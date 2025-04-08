import { NextFunction, Request, Response } from 'express';
export declare class AuthController {
    private authService;
    logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
