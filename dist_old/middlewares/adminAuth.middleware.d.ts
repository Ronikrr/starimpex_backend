import { NextFunction, Request, Response } from 'express';
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
