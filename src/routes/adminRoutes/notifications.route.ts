import { NotificationController } from '@/controllers/adminControllers/notification.controller';
import { GetNotificationDto } from '@/dtos/adminDtos/notification.dto';
import { ParamsObjectIdDto } from '@/dtos/common.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class NotificationRoute implements Routes {
  public path = '/notification';
  public router = Router();
  public notificationController = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, validationMiddleware(GetNotificationDto, 'query'), this.notificationController.getNotifications);
    this.router.get(
      `${this.path}/read/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      this.notificationController.markNotificationRead,
    );
    this.router.delete(
      `${this.path}/clear/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      this.notificationController.deleteNotification,
    );
    this.router.delete(`${this.path}/clear-all`, authMiddleware, this.notificationController.deleteAllNotification);
  }
}
export default NotificationRoute;
