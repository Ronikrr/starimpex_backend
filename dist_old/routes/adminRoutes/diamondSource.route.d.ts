import { Routes } from '../../interfaces/routes.interface';
import { DiamondSourceController } from '../../controllers/adminControllers/diamondSource.controller';
export declare class DiamondSourceRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    diamondSourceController: DiamondSourceController;
    constructor();
    private initializeRoutes;
}
