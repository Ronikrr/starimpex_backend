import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Response } from 'express';
export declare class UserController {
    private userService;
    getUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    editUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    changePassword: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
