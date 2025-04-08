import { Routes } from '../../interfaces/routes.interface';
import { UserController } from '../../controllers/adminControllers/user.controller';
export declare class UserRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    userController: UserController;
    constructor();
    private initializeRoutes;
}
