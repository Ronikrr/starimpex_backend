import { NextFunction, Request, Response } from 'express';
declare global {
    namespace Express {
        interface Response {
            success: (message: string, data?: any) => void;
            error: (errorCode: number, message: string, data?: any) => void;
        }
    }
}
declare const _default: (req: Request, res: Response, next: NextFunction) => void;
export default _default;
