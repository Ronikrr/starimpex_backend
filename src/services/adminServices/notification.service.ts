import { AdminNotification, AdminNotificationModel } from '@/models/adminNotification.model';
import { FCMService } from './fcm.service';
import { HttpException } from '@/exceptions/HttpException';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { GetNotificationDto } from '@/dtos/adminDtos/notification.dto';
import { INotification } from '@/interfaces/adminInterfaces/notification.interface';
import { ResponseMessages } from '@/response/response.messages';
import { Service } from 'typedi';

@Service()
class NotificationService {
  fcmService = new FCMService();

  public async createNotification(notificationData: INotification, fcmToken: string[]): Promise<AdminNotification> {
    const createdNotification = await AdminNotificationModel.create(notificationData);
    if (!createdNotification) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.NOTIFICATION_CREATE_ERROR);
    }

    this.fcmService.sendNotification(createdNotification, fcmToken);

    return createdNotification;
  }

  public async getNotifications(
    getData: GetNotificationDto,
  ): Promise<{ notifications: AdminNotification[]; totalPages: number; totalCount: number }> {
    const totalCount = await AdminNotificationModel.countDocuments();
    if (!totalCount || totalCount === 0) {
      return { notifications: [], totalPages: 0, totalCount: 0 };
    }

    const notifications = await AdminNotificationModel.find({}).sort({ createdAt: -1 }).skip(getData.skip).limit(getData.limit);
    return { notifications, totalPages: Math.ceil(totalCount / getData.limit), totalCount };
  }

  public async deleteNotification(notificationId: string): Promise<void> {
    const deletedNotification = await AdminNotificationModel.findOneAndDelete({ _id: notificationId });
    if (!deletedNotification) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.NOTIFICATION_DELETE_ERROR);
    }
  }

  public async deleteAllNotification(): Promise<void> {
    await AdminNotificationModel.deleteMany();
  }

  public async markNotificationRead(notificationId: string): Promise<AdminNotification> {
    const updatedNotification = await AdminNotificationModel.findOneAndUpdate({ _id: notificationId }, { $set: { isRead: true } }, { new: true });
    if (!updatedNotification) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.NOTIFICATION_UPDATE_ERROR);
    }

    return updatedNotification;
  }
}
export default NotificationService;
