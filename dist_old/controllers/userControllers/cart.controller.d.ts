import { RequestWithUser } from '../../interfaces/userInterfaces/auth.interface';
import { NextFunction, Response } from 'express';
export declare class UserCartController {
    private userCartService;
    addToCart: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    deleteCartItem: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getCartItems: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
