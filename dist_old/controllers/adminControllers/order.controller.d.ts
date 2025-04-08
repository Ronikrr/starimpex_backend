import { NextFunction, Request, Response } from 'express';
export declare class OrderController {
    private commonOrderService;
    private userOrderService;
    getOrderList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOrderDetails: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changeOrderStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAdditionalCharges: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    exportOrdersExcel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOrderItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
