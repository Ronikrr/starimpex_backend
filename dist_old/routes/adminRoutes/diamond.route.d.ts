import { Routes } from '../../interfaces/routes.interface';
export declare class DiamondRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private diamondController;
    constructor();
    private initializeRoutes;
}
