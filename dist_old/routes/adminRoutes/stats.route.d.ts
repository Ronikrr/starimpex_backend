import { Routes } from '../../interfaces/routes.interface';
import { StatsController } from '../../controllers/adminControllers/stats.controller';
export declare class StatsRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    statsController: StatsController;
    constructor();
    private initializeRoutes;
}
