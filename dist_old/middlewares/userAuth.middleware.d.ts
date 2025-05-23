import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/userInterfaces/auth.interface';
declare const authMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
