import { Routes } from '../../interfaces/routes.interface';
export declare class CustomerSupportRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private supportController;
    constructor();
    private initializeRoutes;
}
