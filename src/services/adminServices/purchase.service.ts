import { CreatePurchaseDto, GetPurchaseListDto, UpdatePurchaseDto } from '@/dtos/adminDtos/purchase.dto';
import { HttpException } from '@/exceptions/HttpException';
import { OrderModel } from '@/models/order.model';
import { Purchase, PurchaseModel } from '@/models/purchase.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { getPurchaseExcelBuffer } from '@/utils/fileExport';
import { filterPurchaseProjection } from '@/utils/filters/adminFilters';
import { formatDate, formatPurchaseToExcelData } from '@/utils/helpers';
import { Types } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class PurchaseService {
  public async createPurchase(data: CreatePurchaseDto): Promise<Purchase> {
    const stoneIds = data.items.map(item => item.stoneId);
    if (stoneIds.length !== new Set(stoneIds).size) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_CREATE_FAILED_FOUND_DUPLICATE_ITEMS);
    }

    const findPurchase = await PurchaseModel.findOne({ orderId: data.orderId, 'items.stoneNo': { $in: stoneIds }, isDeleted: false });
    if (findPurchase) {
      const removeStoneIds = findPurchase.items.map((item: any) => item.stoneNo);
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_ALREADY_EXISTS, { removeStoneIds });
    }

    const findOrder = await OrderModel.findOne({ orderNumber: data.orderId, 'items.stoneNo': { $in: stoneIds } });
    if (!findOrder) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_NOT_FOUND);
    }
    const items = [];
    data.items.map(item => {
      const findOrderItem = findOrder.items.find(orderItem => item.stoneId === orderItem.stoneNo);
      if (findOrderItem) {
        const { finalDiscount, finalPrice, finalRap, finalTotalPrice } = item;
        items.push({ ...findOrderItem, finalDiscount, finalPrice, finalRap, finalTotalPrice });
      }
    });

    const createPurchaseData = {
      orderId: data.orderId,
      date: data.date,
      supplierName: data?.supplierName || null,
      supplierAddress: data?.supplierAddress || null,
      description: data?.description || null,
      items: items,
    };
    const createdPurchase = await PurchaseModel.create(createPurchaseData);

    return createdPurchase;
  }

  public async updatePurchase(data: UpdatePurchaseDto, purchaseId: string): Promise<Purchase> {
    const stoneIds = data.items.map(item => item.stoneId);
    if (stoneIds.length !== new Set(stoneIds).size) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_UPDATE_FAILED_FOUND_DUPLICATE_ITEMS);
    }

    const findPurchase = await PurchaseModel.findOne({
      _id: { $ne: purchaseId },
      orderId: data.orderId,
      'items.stoneNo': { $in: stoneIds },
      isDeleted: false,
    });
    if (findPurchase) {
      const removeStoneIds = findPurchase.items.map((item: any) => item.stoneNo);
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_ALREADY_EXISTS, { removeStoneIds });
    }

    const findOrder = await OrderModel.findOne({ orderNumber: data.orderId, 'items.stoneNo': { $in: stoneIds } });
    if (!findOrder) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_NOT_FOUND);
    }

    const items = [];
    data.items.forEach(item => {
      const findOrderItem = findOrder.items.find(orderItem => item.stoneId === orderItem.stoneNo);
      if (findOrderItem) {
        const { finalDiscount, finalPrice, finalRap, finalTotalPrice } = item;
        items.push({ ...findOrderItem, finalDiscount, finalPrice, finalRap, finalTotalPrice });
      }
    });

    const updatePurchaseData = {
      date: data.date,
      supplierName: data?.supplierName || null,
      supplierAddress: data?.supplierAddress || null,
      description: data?.description || null,
      items: items,
    };
    const updatedPurchase = await PurchaseModel.findOneAndUpdate({ _id: purchaseId }, { $set: updatePurchaseData }, { new: true });

    if (!updatedPurchase) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_NOT_FOUND);
    }

    return updatedPurchase;
  }

  public async getPurchaseList(getData: GetPurchaseListDto): Promise<{ purchases: Purchase[]; totalPages: number; totalCount: number }> {
    const totalCount = await PurchaseModel.countDocuments({ isDeleted: false });
    if (!totalCount || totalCount === 0) {
      return {
        purchases: [],
        totalPages: 0,
        totalCount: 0,
      };
    }

    const findCondition: any = { isDeleted: false };
    const fromDate = getData.fromDate;
    const toDate = getData.toDate;
    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
      findCondition.date = { $gte: fromDate };
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
      if (findCondition.date) {
        findCondition.date.$lte = toDate;
      } else {
        findCondition.date = { $lte: toDate };
      }
    }
    if (getData.orderId) {
      findCondition.orderId = { $eq: getData.orderId.toUpperCase() };
    }

    const purchases = await PurchaseModel.find(findCondition, filterPurchaseProjection).sort({ date: -1 }).skip(getData.skip).limit(getData.limit);

    return {
      purchases,
      totalPages: Math.ceil(totalCount / getData.limit),
      totalCount,
    };
  }

  public async deletePurchase(purchaseId: string): Promise<void> {
    const updatedPurchase = await PurchaseModel.findOneAndUpdate({ _id: purchaseId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });

    if (!updatedPurchase) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_NOT_FOUND);
    }
  }

  public async exportPurchasesExcel(purchaseIds: Array<string>, fromDate?: Date, toDate?: Date) {
    const findCondition: any = {};
    if (purchaseIds) {
      findCondition._id = { $in: purchaseIds.map(id => new Types.ObjectId(id)) };
    }
    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
      findCondition.date = { $gte: fromDate };
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
      if (findCondition.date) {
        findCondition.date.$lte = toDate;
      } else {
        findCondition.date = { $lte: toDate };
      }
    }

    const totalCount = await PurchaseModel.countDocuments(findCondition);
    if (!totalCount || totalCount === 0) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_NOT_FOUND);
    }

    const findPurchases = await PurchaseModel.aggregate([
      {
        $match: findCondition,
      },
      {
        $unwind: {
          path: '$items',
        },
      },
    ]);

    const data = findPurchases.map(purchase => {
      return { orderNumber: purchase.orderId, date: new Date(purchase.date).toISOString(), ...purchase.items };
    });

    const finalDiamondData = formatPurchaseToExcelData(data);
    const buffer = await getPurchaseExcelBuffer(finalDiamondData, `Purchase Report ${formatDate(new Date())}`, fromDate, toDate);

    return buffer;
  }

  public async getPurchaseDetails(purchaseId: string): Promise<{ purchase: Purchase; otherDetails: any }> {
    const findPurchase = await PurchaseModel.findOne({ _id: purchaseId });

    if (!findPurchase) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.PURCHASE_NOT_FOUND);
    }

    const totalStones = findPurchase.items.length;
    let totalCarats = 0;
    let totalAmount = 0;

    findPurchase.items.forEach((item: any) => {
      totalCarats += item?.finalPrice || 0;
      totalAmount += item?.finalTotalPrice || 0;
    });

    return { purchase: findPurchase, otherDetails: { totalStones, totalCarats: totalCarats.toFixed(2), totalAmount: totalAmount.toFixed(2) } };
  }
}
