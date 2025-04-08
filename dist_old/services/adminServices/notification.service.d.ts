import { AdminNotification } from '../../models/adminNotification.model';
import { FCMService } from './fcm.service';
import { GetNotificationDto } from '../../dtos/adminDtos/notification.dto';
import { INotification } from '../../interfaces/adminInterfaces/notification.interface';
declare class NotificationService {
    fcmService: FCMService;
    createNotification(notificationData: INotification, fcmToken: string[]): Promise<AdminNotification>;
    getNotifications(getData: GetNotificationDto): Promise<{
        notifications: AdminNotification[];
        totalPages: number;
        totalCount: number;
    }>;
    deleteNotification(notificationId: string): Promise<void>;
    deleteAllNotification(): Promise<void>;
    markNotificationRead(notificationId: string): Promise<AdminNotification>;
}
export default NotificationService;
