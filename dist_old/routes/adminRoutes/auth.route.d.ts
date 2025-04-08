import { AuthController } from '../../controllers/adminControllers/auth.controller';
import { Routes } from '../../interfaces/routes.interface';
export declare class AuthRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    constructor();
    private initializeRoutes;
}
