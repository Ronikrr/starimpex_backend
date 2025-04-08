import { Routes } from '../../interfaces/routes.interface';
export declare class PurchaseRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private purchaseController;
    constructor();
    private initializeRoutes;
}
