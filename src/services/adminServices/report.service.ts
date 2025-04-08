import Container, { Service } from 'typedi';
import { PurchaseService } from './purchase.service';
import { GetReportDto } from '@/dtos/adminDtos/report.dto';
import { EReportType } from '@/interfaces/adminInterfaces/report.interface';
import { CommonOrderService } from '../order.service';
import { OrderModel } from '@/models/order.model';
import { PurchaseModel } from '@/models/purchase.model';
import { formatDate, formatProfitToExcelData } from '@/utils/helpers';
import { getProfitExcelBuffer } from '@/utils/fileExport';
import { HttpException } from '@/exceptions/HttpException';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';

@Service()
export class ReportService {
  private orderService = Container.get(CommonOrderService);
  private purchaseService = Container.get(PurchaseService);

  private async getProfitReportExcel(fromDate: Date, toDate: Date) {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);
    const findCondition = { createdAt: { $gte: fromDate, $lte: toDate } };

    const totalCount = await OrderModel.countDocuments(findCondition);
    if (!totalCount || totalCount === 0) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.ORDER_NOT_FOUND);
    }

    const findOrders = await OrderModel.find(findCondition).sort({ createdAt: -1 }).lean();
    const orderIds = findOrders.map(order => order.orderNumber);

    const findPurchases = await PurchaseModel.aggregate([
      {
        $match: { orderId: { $in: orderIds } },
      },
      {
        $unwind: {
          path: '$items',
        },
      },
    ]);

    const data = findPurchases.map(purchase => {
      return {
        orderNumber: purchase.orderId,
        ...purchase.items,
        profit: purchase.items.ourPrice - purchase.items.finalTotalPrice,
        supplierName: purchase.supplierName,
        supplierAddress: purchase.supplierAddress,
        description: purchase.description,
      };
    });

    const finalDiamondData = formatProfitToExcelData(data);
    const buffer = await getProfitExcelBuffer(finalDiamondData, `Profit Report ${formatDate(new Date())}`, fromDate, toDate);

    return buffer;
  }

  public async getReportExcel(getData: GetReportDto) {
    let excelBuffer = null;
    const { fromDate, toDate, reportType } = getData;

    switch (reportType) {
      case EReportType.SALES:
        excelBuffer = this.orderService.exportOrdersExcel(null, null, fromDate, toDate);
        break;

      case EReportType.PURCHASE:
        excelBuffer = this.purchaseService.exportPurchasesExcel(null, fromDate, toDate);
        break;

      case EReportType.PROFIT:
        excelBuffer = this.getProfitReportExcel(fromDate, toDate);
        break;
    }

    return excelBuffer;
  }
}
