import { INITIAL_ORDER_NUMBER, ORDER_NUMBER_PREFIX } from '@/config';
import { CreateOrderDto } from '@/dtos/userDtos/order.dto';
import { HttpException } from '@/exceptions/HttpException';
import { EOrderItemStatus } from '@/interfaces/order.interface';
import { CartModel } from '@/models/cart.model';
import { DiamondModel } from '@/models/diamonds.model';
import { Order, OrderModel } from '@/models/order.model';
import { TrackerModel } from '@/models/tracker.model';
import { User } from '@/models/users.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { formatDate, formatOrderToExcelData } from '@/utils/helpers';
import { sendPlacedOrderMail } from '@/utils/mailer';
import { Service } from 'typedi';
import NotificationService from '../adminServices/notification.service';
import { AdminSettingsModel } from '@/models/adminSettings.model';
import { ENotificationType, INotification } from '@/interfaces/adminInterfaces/notification.interface';
import { getOrderExcelBuffer } from '@/utils/fileExport';

async function newOrderPlacedNotification(createdOrder: Order, user: User) {
  const notificationService = new NotificationService();

  const fcmToken = (await AdminSettingsModel.findOne())?.fcmTokens || [];

  const notification: INotification = {
    title: 'New Order',
    body: `#${createdOrder.orderNumber} placed by ${user.fullName}`,
    type: ENotificationType.NEW_ORDER,
    url: `/admin/order-list/${createdOrder._id}`,
  };
  await notificationService.createNotification(notification, fcmToken);
}

@Service()
export class OrderService {
  public async createOrder(data: CreateOrderDto, user: User) {
    if (!data.isTermsAccepted) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_FAILED_ACCEPT_TERMS_ERROR);
    }

    const findDiamonds = await DiamondModel.find({ _id: { $in: data.items }, isDeleted: false });

    if (findDiamonds.length < data.items.length) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_FAILED_SOLD_OUT_ERROR);
    }

    const updatedTracker = await TrackerModel.findOneAndUpdate({}, { $inc: { lastOrderIncrement: 1 } }, { upsert: true, new: true });
    const orderNumber = INITIAL_ORDER_NUMBER + updatedTracker.lastOrderIncrement;

    let totalCarats = 0;
    let grossAmount = 0;
    const orderItems = findDiamonds.map(diamond => {
      totalCarats += diamond.caratWeight;
      grossAmount += Number(diamond.ourPrice.toFixed(2));

      return { ...diamond.toObject(), confirmationStatus: EOrderItemStatus.PENDING };
    });

    const createdOrder = await OrderModel.create({
      items: orderItems,
      orderNumber: `${ORDER_NUMBER_PREFIX}${orderNumber}`,
      user: user._id,
      remarks: data.remarks,
      isTermsAccepted: data.isTermsAccepted,
      totalStones: findDiamonds.length,
      totalCarats: Number(totalCarats.toFixed(2)),
      grossAmount: Number(grossAmount.toFixed(2)),
    });

    if (!createdOrder) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.SOMETHING_WENT_WRONG);
    }

    await CartModel.deleteMany({
      diamond: { $in: data.items },
      userId: user._id,
    });

    const orderData = findDiamonds.map(diamond => {
      return { orderNumber: createdOrder.orderNumber, ...diamond.toObject() };
    });

    const finalDiamondData = formatOrderToExcelData(orderData);
    const buffer = await getOrderExcelBuffer(finalDiamondData, `Order Stone Details ${formatDate(new Date())}`);
    sendPlacedOrderMail({ user, order: createdOrder, excelBuffer: buffer });
    newOrderPlacedNotification(createdOrder, user);
  }
}
