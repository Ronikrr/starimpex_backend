import { Routes } from '../../interfaces/routes.interface';
export declare class UserRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private userController;
    constructor();
    private initializeRoutes;
}
