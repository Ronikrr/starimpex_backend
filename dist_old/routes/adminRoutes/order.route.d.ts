import { Routes } from '../../interfaces/routes.interface';
export declare class OrderRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private orderController;
    constructor();
    private initializeRoutes;
}
