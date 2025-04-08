import { Routes } from '../../interfaces/routes.interface';
export declare class DashboardRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private dashboardController;
    constructor();
    private initializeRoutes;
}
