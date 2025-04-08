import { Routes } from '../../interfaces/routes.interface';
export declare class AuthRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private authController;
    constructor();
    private initializeRoutes;
}
