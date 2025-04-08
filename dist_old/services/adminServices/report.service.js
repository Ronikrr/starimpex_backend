"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = tslib_1.__importStar(require("typedi"));
const purchase_service_1 = require("./purchase.service");
const report_interface_1 = require("../../interfaces/adminInterfaces/report.interface");
const order_service_1 = require("../order.service");
const order_model_1 = require("../../models/order.model");
const purchase_model_1 = require("../../models/purchase.model");
const helpers_1 = require("../../utils/helpers");
const fileExport_1 = require("../../utils/fileExport");
const HttpException_1 = require("../../exceptions/HttpException");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
let ReportService = class ReportService {
    constructor() {
        this.orderService = typedi_1.default.get(order_service_1.CommonOrderService);
        this.purchaseService = typedi_1.default.get(purchase_service_1.PurchaseService);
    }
    async getProfitReportExcel(fromDate, toDate) {
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        const findCondition = { createdAt: { $gte: fromDate, $lte: toDate } };
        const totalCount = await order_model_1.OrderModel.countDocuments(findCondition);
        if (!totalCount || totalCount === 0) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        const findOrders = await order_model_1.OrderModel.find(findCondition).sort({ createdAt: -1 }).lean();
        const orderIds = findOrders.map(order => order.orderNumber);
        const findPurchases = await purchase_model_1.PurchaseModel.aggregate([
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
            return Object.assign(Object.assign({ orderNumber: purchase.orderId }, purchase.items), { profit: purchase.items.ourPrice - purchase.items.finalTotalPrice, supplierName: purchase.supplierName, supplierAddress: purchase.supplierAddress, description: purchase.description });
        });
        const finalDiamondData = (0, helpers_1.formatProfitToExcelData)(data);
        const buffer = await (0, fileExport_1.getProfitExcelBuffer)(finalDiamondData, `Profit Report ${(0, helpers_1.formatDate)(new Date())}`, fromDate, toDate);
        return buffer;
    }
    async getReportExcel(getData) {
        let excelBuffer = null;
        const { fromDate, toDate, reportType } = getData;
        switch (reportType) {
            case report_interface_1.EReportType.SALES:
                excelBuffer = this.orderService.exportOrdersExcel(null, null, fromDate, toDate);
                break;
            case report_interface_1.EReportType.PURCHASE:
                excelBuffer = this.purchaseService.exportPurchasesExcel(null, fromDate, toDate);
                break;
            case report_interface_1.EReportType.PROFIT:
                excelBuffer = this.getProfitReportExcel(fromDate, toDate);
                break;
        }
        return excelBuffer;
    }
};
ReportService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map