import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
export declare class AuthController {
    private authService;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    forgotPassword: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    resetPassword: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
