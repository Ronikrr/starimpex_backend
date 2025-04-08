import { Routes } from '../../interfaces/routes.interface';
export declare class PriceTrackerRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private priceTrackerController;
    constructor();
    private initializeRoutes;
}
