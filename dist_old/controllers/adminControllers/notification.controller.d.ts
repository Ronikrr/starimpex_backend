import NotificationService from '../../services/adminServices/notification.service';
import { NextFunction, Request, Response } from 'express';
export declare class NotificationController {
    notificationService: NotificationService;
    getNotifications: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteNotification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAllNotification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    markNotificationRead: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
