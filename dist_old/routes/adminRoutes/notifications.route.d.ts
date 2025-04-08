import { NotificationController } from '../../controllers/adminControllers/notification.controller';
import { Routes } from '../../interfaces/routes.interface';
declare class NotificationRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    notificationController: NotificationController;
    constructor();
    private initializeRoutes;
}
export default NotificationRoute;
