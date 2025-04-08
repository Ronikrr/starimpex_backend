import { INITIAL_ORDER_NUMBER, ORDER_NUMBER_PREFIX } from '@/config';
import { ChangeOrderStatusDto, CreateManualOrderDto, OrderAdditionChargesDto } from '@/dtos/adminDtos/order.dto';
import { HttpException } from '@/exceptions/HttpException';
import { EDiamondStatus } from '@/interfaces/diamonds.interface';
import { EOrderItemStatus, EOrderStatus, IOrderItem } from '@/interfaces/order.interface';
import { Order, OrderModel } from '@/models/order.model';
import { TrackerModel } from '@/models/tracker.model';
import { CODE_BAD_REQUEST, CODE_NOT_FOUND } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { Types } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class UserOrderService {
  public async changeOrderStatus(data: ChangeOrderStatusDto, orderId: string): Promise<Order> {
    const isPartialConfirmationNotAllowed = data.status !== EOrderStatus.PARTIALLY_CONFIRM && data.items;

    if (isPartialConfirmationNotAllowed) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PARTIAL_CONFIRMATION_NOT_ALLOWED_ERROR);
    }

    if (data.status === EOrderStatus.PARTIALLY_CONFIRM) {
      const findOrder = await OrderModel.findOne({ _id: orderId });
      const allItemIds = data.items.map(item => item.itemId);
      const allUpdateItemsMatch =
        data.status === EOrderStatus.PARTIALLY_CONFIRM && findOrder && findOrder.items.every(items => allItemIds.includes(items._id.toString()));
      if (!allUpdateItemsMatch) {
        throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_STATUS_CHANGE_ITEMS_NOT_MATCH_ERROR);
      }

      const isSomeItemsConfirm = data.items.some(item => item.isConfirmed === true);
      const isSomeItemsNotConfirm = data.items.some(item => item.isConfirmed === false);
      if (!isSomeItemsConfirm || !isSomeItemsNotConfirm) {
        throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_STATUS_CHANGE_TYPE_PARTIAL_ITEMS_NOT_PARTIALLY_CONFIRMED_ERROR);
      }
    }

    const updateOrder = {
      status: data.status,
    };

    if (data.status !== EOrderStatus.PARTIALLY_CONFIRM) {
      updateOrder['items.$[].confirmationStatus'] =
        data.status === EOrderStatus.CONFIRM
          ? EOrderItemStatus.CONFIRM
          : data.status === EOrderStatus.CANCELED
          ? EOrderItemStatus.NOT_CONFIRM
          : EOrderItemStatus.PENDING;
    }

    let itemFilters = [];
    if (data.status === EOrderStatus.PARTIALLY_CONFIRM) {
      const confirmIds = [];
      const notConfirmIds = [];
      for (let index = 0; index < data.items.length; index++) {
        if (data.items[index].isConfirmed) {
          confirmIds.push(new Types.ObjectId(data.items[index].itemId));
        } else {
          notConfirmIds.push(new Types.ObjectId(data.items[index].itemId));
        }
      }

      itemFilters = [
        {
          'confirmItems._id': { $in: confirmIds },
        },
        {
          'notConfirmItems._id': { $in: notConfirmIds },
        },
      ];
      updateOrder['items.$[confirmItems].confirmationStatus'] = EOrderItemStatus.CONFIRM;
      updateOrder['items.$[notConfirmItems].confirmationStatus'] = EOrderItemStatus.NOT_CONFIRM;
    }

    const updatedOrder = await OrderModel.findOneAndUpdate({ _id: orderId }, { $set: updateOrder }, { new: true, arrayFilters: itemFilters });

    if (!updatedOrder) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.ORDER_NOT_FOUND);
    }

    return updatedOrder;
  }

  public async updateAdditionalCharges(data: OrderAdditionChargesDto, orderId: string): Promise<Order> {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { $set: { shippingCharge: data.shippingCharge, additionalCharges: data?.additionalCharges } },
      { new: true },
    );

    if (!updatedOrder) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.ORDER_NOT_FOUND);
    }

    return updatedOrder;
  }

  public async getOrderItems(orderNumber: string): Promise<Array<IOrderItem>> {
    const findOrder = await OrderModel.findOne({ orderNumber: orderNumber.toUpperCase() });

    if (!findOrder) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_NOT_FOUND);
    }

    return findOrder.items;
  }

  public async createOrder(createData: CreateManualOrderDto) {
    let grossAmount = 0;
    let totalCarats = 0;
    const orderItems = createData.orderItems.map(item => {
      grossAmount += Number(item.ourPrice);
      totalCarats += Number(item.caratWeight);

      return { ...item, confirmationStatus: EOrderItemStatus.PENDING, status: EDiamondStatus.AVAILABLE };
    });

    const updatedTracker = await TrackerModel.findOneAndUpdate({}, { $inc: { lastOrderIncrement: 1 } }, { upsert: true, new: true });
    const orderNumber = INITIAL_ORDER_NUMBER + updatedTracker.lastOrderIncrement;

    const orderDate = new Date(createData.orderDate);
    const createdOrder = await OrderModel.create({
      items: orderItems,
      orderNumber: `${ORDER_NUMBER_PREFIX}${orderNumber}`,
      totalStones: orderItems.length,
      grossAmount: Number(grossAmount.toFixed(2)),
      totalCarats: Number(totalCarats.toFixed(2)),
      isManualOrder: true,
      companyName: createData?.companyName || null,
      companyEmail: createData?.companyEmail || null,
      description: createData?.description || null,
      createdAt: orderDate,
    });

    return createdOrder;
  }

  public async updateOrder(updateData: CreateManualOrderDto, orderId: string) {
    let grossAmount = 0;
    let totalCarats = 0;
    const orderItems = updateData.orderItems.map(item => {
      grossAmount += Number(item.ourPrice);
      totalCarats += Number(item.caratWeight);

      return { ...item, confirmationStatus: EOrderItemStatus.PENDING, status: EDiamondStatus.AVAILABLE };
    });

    const orderDate = new Date(updateData.orderDate);
    const updatedOrder = await OrderModel.findOneAndUpdate(
      {
        _id: orderId,
        isManualOrder: true,
      },
      {
        $set: {
          items: orderItems,
          totalStones: orderItems.length,
          grossAmount: Number(grossAmount.toFixed(2)),
          totalCarats: Number(totalCarats.toFixed(2)),
          companyName: updateData?.companyName || null,
          companyEmail: updateData?.companyEmail || null,
          description: updateData?.description || null,
          createdAt: orderDate,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedOrder) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_NOT_FOUND_OR_CANNOT_UPDATE);
    }

    return updatedOrder;
  }
}
