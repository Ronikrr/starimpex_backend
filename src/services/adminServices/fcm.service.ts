import { AdminNotification } from '@/models/adminNotification.model';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import fcmAdmin from 'firebase-admin';
import { APP_URL } from '@/config';
import { logger } from '@/utils/logger';
import { Service } from 'typedi';
import { AdminSettingsModel } from '@/models/adminSettings.model';

fcmAdmin.initializeApp({
  credential: fcmAdmin.credential.applicationDefault(),
});
@Service()
export class FCMService {
  public async sendNotification(notificationData: AdminNotification, fcmToken: string[]): Promise<void> {
    if (fcmToken.length === 0) return;
    const fcmMessage: MulticastMessage = {
      webpush: {
        headers: {
          Urgency: 'high',
        },
        fcmOptions: {
          link: `${APP_URL}${notificationData.url}`,
        },
      },
      data: { data: JSON.stringify(notificationData) },
      notification: {
        title: notificationData.title,
        body: notificationData.body,
      },
      tokens: fcmToken,
    };
    logger.info(`Sending FCM notification : ${JSON.stringify(fcmMessage)} to admin`);
    const result = await fcmAdmin.messaging().sendEachForMulticast(fcmMessage);

    const removeFcmTokens = result.responses.map((response, index) => {
      if (response.error) {
        return fcmToken[index];
      }
    });
    if (removeFcmTokens.length) {
      await AdminSettingsModel.findOneAndUpdate({}, { $pull: { fcmTokens: { $in: removeFcmTokens } } });
    }
    logger.info(`FCM notification result : ${JSON.stringify(fcmMessage)} with result ${JSON.stringify(result)}`);
  }
}
