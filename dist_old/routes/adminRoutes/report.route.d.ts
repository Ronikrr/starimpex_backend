import { Routes } from '../../interfaces/routes.interface';
export declare class ReportRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    private reportController;
    constructor();
    private initializeRoutes;
}
