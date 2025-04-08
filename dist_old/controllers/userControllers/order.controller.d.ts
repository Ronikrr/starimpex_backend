import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Response } from 'express';
export declare class OrderController {
    private orderService;
    private commonOrderService;
    createOrder: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getOrderList: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getOrderDetails: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    exportOrdersExcel: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
