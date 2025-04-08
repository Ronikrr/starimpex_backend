import { ResponseMessages } from '@/response/response.messages';
import NotificationService from '@/services/adminServices/notification.service';
import { NextFunction, Request, Response } from 'express';

export class NotificationController {
  public notificationService = new NotificationService();

  public getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skip = Number(req.query.skip || 0);
      const limit = Number(req.query.limit || 10);
      const getData = await this.notificationService.getNotifications({ skip, limit });

      res.success(ResponseMessages.NOTIFICATION_LIST_FOUND, getData);
    } catch (error) {
      next(error);
    }
  };

  public deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.notificationService.deleteNotification(req.params.id);

      res.success(ResponseMessages.NOTIFICATION_DELETE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public deleteAllNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.notificationService.deleteAllNotification();

      res.success(ResponseMessages.NOTIFICATION_DELETE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public markNotificationRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedNotification = await this.notificationService.markNotificationRead(req.params.id);

      res.success(ResponseMessages.NOTIFICATION_MARK_READ_SUCCESS, updatedNotification);
    } catch (error) {
      next(error);
    }
  };
}
