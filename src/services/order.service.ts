import { GetOrderListDto } from '@/dtos/order.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Order, OrderModel } from '@/models/order.model';
import { User } from '@/models/users.model';
import { CODE_BAD_REQUEST, CODE_NOT_FOUND } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { getOrderExcelBuffer } from '@/utils/fileExport';
import { formatDate, formatOrderToExcelData } from '@/utils/helpers';
import { Types } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class CommonOrderService {
  public async getOrderList(getData: GetOrderListDto, user?: User): Promise<{ totalOrders: number; totalPages: number; orders: Order[] }> {
    const findCondition: any = {};
    const fromDate = getData.fromOrderDate ? getData.fromOrderDate : null;
    const toDate = getData.toOrderDate ? getData.toOrderDate : null;
    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    }

    if (user) {
      findCondition.user = user._id;
    }
    if (getData.orderNumber) {
      findCondition.orderNumber = getData.orderNumber;
    }
    if (fromDate) {
      findCondition.createdAt = { $gte: fromDate };
    }
    if (toDate) {
      if (findCondition.createdAt) {
        findCondition.createdAt.$lte = toDate;
      } else {
        findCondition.createdAt = { $lte: toDate };
      }
    }
    if (getData.fromCarats) {
      findCondition.totalCarats = { $gte: getData.fromCarats };
    }
    if (getData.toCarats) {
      if (findCondition.totalCarats) {
        findCondition.totalCarats.$lte = getData.toCarats;
      } else {
        findCondition.totalCarats = { $lte: getData.toCarats };
      }
    }
    if (getData.fromTotalItems) {
      findCondition.totalStones = { $gte: getData.fromTotalItems };
    }
    if (getData.toTotalItems) {
      if (findCondition.totalStones) {
        findCondition.totalStones.$lte = getData.toTotalItems;
      } else {
        findCondition.totalStones = { $lte: getData.toTotalItems };
      }
    }

    const totalAmountCondition: any = {};
    if (getData.fromAmount) {
      totalAmountCondition.totalAmount = { $gte: getData.fromAmount };
    }
    if (getData.toAmount) {
      if (totalAmountCondition.totalAmount) {
        totalAmountCondition.totalAmount.$lte = getData.toAmount;
      } else {
        totalAmountCondition.totalAmount = { $lte: getData.toAmount };
      }
    }

    const data = await OrderModel.aggregate([
      {
        $unwind: {
          path: '$additionalCharges',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          orderData: {
            $first: '$$ROOT',
          },
          totalAdditionalCharges: {
            $sum: '$additionalCharges.amount',
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: '$orderData.user',
          orderNumber: '$orderData.orderNumber',
          createdAt: '$orderData.createdAt',
          totalStones: '$orderData.totalStones',
          totalCarats: '$orderData.totalCarats',
          grossAmount: '$orderData.grossAmount',
          totalAdditionalCharges: '$orderData.totalAdditionalCharges',
          totalAmount: {
            $add: ['$orderData.grossAmount', '$orderData.shippingCharge', '$totalAdditionalCharges'],
          },
        },
      },
      { $match: { ...findCondition, ...totalAmountCondition } },
      { $count: 'totalCount' },
    ]);

    if (!data || !data.length || !data[0]?.totalCount) {
      return {
        orders: [],
        totalPages: 0,
        totalOrders: 0,
      };
    }

    const orders = await OrderModel.aggregate([
      { $match: findCondition },
      {
        $unwind: {
          path: '$additionalCharges',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          orderNumber: {
            $first: '$orderNumber',
          },
          orderData: {
            $first: '$$ROOT',
          },
          totalAdditionalCharges: {
            $sum: '$additionalCharges.amount',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'orderData.user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          orderNumber: '$orderData.orderNumber',
          orderDate: '$orderData.createdAt',
          user: {
            $cond: {
              if: { $eq: ['$orderData.isManualOrder', true] },
              then: {
                email: '$orderData.companyEmail',
                companyName: '$orderData.companyName',
                fullName: '',
              },
              else: {
                email: '$user.email',
                fullName: '$user.fullName',
                companyName: '$user.companyName',
              },
            },
          },
          totalStones: '$orderData.totalStones',
          totalCarats: '$orderData.totalCarats',
          grossAmount: '$orderData.grossAmount',
          shippingCharge: '$orderData.shippingCharge',
          totalAdditionalCharges: '$totalAdditionalCharges',
          totalAmount: {
            $add: ['$orderData.grossAmount', '$orderData.shippingCharge', '$totalAdditionalCharges'],
          },
          status: '$orderData.status',
          isManualOrder: '$orderData.isManualOrder',
        },
      },
      { $match: totalAmountCondition },
      {
        $sort: {
          orderDate: -1,
        },
      },
      { $skip: getData.skip },
      { $limit: getData.limit },
    ]);

    return {
      totalPages: Math.ceil(data[0].totalCount / getData.limit),
      totalOrders: data[0].totalCount,
      orders,
    };
  }

  public async getOrderDetails(orderId: string, user?: User): Promise<{ order: Order; totalAmount: number; totalAdditionalCharges: number }> {
    const findCondition: any = { _id: orderId };
    if (user) {
      findCondition.user = user._id;
    }

    const findOrder = await OrderModel.findOne(findCondition).populate('user', { companyName: 1, email: 1 });

    if (!findOrder) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.ORDER_NOT_FOUND);
    }

    findCondition._id = new Types.ObjectId(orderId);

    const data = await OrderModel.aggregate([
      { $match: findCondition },
      {
        $unwind: {
          path: '$additionalCharges',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          orderData: {
            $first: '$$ROOT',
          },
          totalAdditionalCharges: {
            $sum: '$additionalCharges.amount',
          },
        },
      },
      {
        $project: {
          totalAmount: {
            $add: ['$orderData.grossAmount', '$orderData.shippingCharge', '$totalAdditionalCharges'],
          },
          totalAdditionalCharges: 1,
        },
      },
    ]);

    return {
      order: findOrder,
      totalAmount: data && data.length ? data[0].totalAmount : 0,
      totalAdditionalCharges: data && data.length ? data[0].totalAdditionalCharges : 0,
    };
  }

  public async exportOrdersExcel(orderIds: Array<string>, user?: User, fromDate?: Date, toDate?: Date) {
    const findCondition: any = {};
    if (orderIds) {
      findCondition._id = { $in: orderIds.map(id => new Types.ObjectId(id)) };
    }
    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
      findCondition.createdAt = { $gte: fromDate };
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
      if (findCondition.createdAt) {
        findCondition.createdAt.$lte = toDate;
      } else {
        findCondition.createdAt = { $lte: toDate };
      }
    }
    if (user) {
      findCondition.user = user._id;
    }

    const totalCount = await OrderModel.countDocuments(findCondition);
    if (!totalCount || totalCount === 0) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_NOT_FOUND);
    }

    const findOrders = await OrderModel.aggregate([
      {
        $match: findCondition,
      },
      {
        $unwind: {
          path: '$items',
        },
      },
    ]);

    const data = findOrders.map(order => {
      return { orderNumber: order.orderNumber, ...order.items };
    });

    const finalDiamondData = formatOrderToExcelData(data);
    const buffer = await getOrderExcelBuffer(finalDiamondData, `Order Stone Details ${formatDate(new Date())}`, fromDate, toDate);

    return buffer;
  }
}
