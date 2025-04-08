import { AdminNotificationModel } from '@/models/adminNotification.model';
import { AdminSettingsModel } from '@/models/adminSettings.model';
import { CartModel } from '@/models/cart.model';
import { ContactModel } from '@/models/contact.model';
import { CustomerQueryModel } from '@/models/customerQuery.model';
import { DiamondModel } from '@/models/diamonds.model';
import { DiamondSourceModel } from '@/models/diamondSources.model';
import { FeedbackModel } from '@/models/feedback.model';
import { InquiryModel } from '@/models/inquiry.model';
import { OrderModel } from '@/models/order.model';
import { PriceTrackerModel } from '@/models/priceTracker.model';
import { PurchaseModel } from '@/models/purchase.model';
import { SearchHistoryModel } from '@/models/searchHistory.model';
import { TrackerModel } from '@/models/tracker.model';
import { UserCartHistoryModel } from '@/models/userCartHistory.model';
import { UserDiamondNotesModel } from '@/models/userDiamondNotes.model';
import { UserPriceTrackHistoryModel } from '@/models/userPriceTrackHistory.model';
import { UserModel } from '@/models/users.model';
import { logger } from '@/utils/logger';

export const migrateSyncIndexes = async () => {
  try {
    logger.info('Migration sync indexes >>>>>');

    await AdminNotificationModel.syncIndexes();
    await AdminSettingsModel.syncIndexes();
    await CartModel.syncIndexes();
    await ContactModel.syncIndexes();
    await CustomerQueryModel.syncIndexes();
    await DiamondModel.syncIndexes();
    await DiamondSourceModel.syncIndexes();
    await FeedbackModel.syncIndexes();
    await InquiryModel.syncIndexes();
    await OrderModel.syncIndexes();
    await PriceTrackerModel.syncIndexes();
    await PurchaseModel.syncIndexes();
    await SearchHistoryModel.syncIndexes();
    await TrackerModel.syncIndexes();
    await UserCartHistoryModel.syncIndexes();
    await UserDiamondNotesModel.syncIndexes();
    await UserPriceTrackHistoryModel.syncIndexes();
    await UserModel.syncIndexes();

    logger.info('ALL Indexed synced >>>');
    return true;
  } catch (error) {
    logger.error('Error while migrating sync indexes >>> ');
    logger.error(error);

    return false;
  }
};
