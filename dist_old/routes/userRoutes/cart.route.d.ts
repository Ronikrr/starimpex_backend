import { Routes } from '../../interfaces/routes.interface';
export declare class UserCartRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private userCartController;
    constructor();
    private initializeRoutes;
}
