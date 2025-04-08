import { AdminNotification } from '../../models/adminNotification.model';
export declare class FCMService {
    sendNotification(notificationData: AdminNotification, fcmToken: string[]): Promise<void>;
}
