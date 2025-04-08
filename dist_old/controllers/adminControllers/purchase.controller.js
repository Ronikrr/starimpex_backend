"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const purchase_service_1 = require("../../services/adminServices/purchase.service");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class PurchaseController {
    constructor() {
        this.purchaseService = typedi_1.default.get(purchase_service_1.PurchaseService);
        this.createPurchase = async (req, res, next) => {
            try {
                const createdPurchase = await this.purchaseService.createPurchase(req.body);
                res.success(response_messages_1.ResponseMessages.PURCHASE_CREATE_SUCCESS, { purchase: (0, adminFilters_1.filterPurchase)(createdPurchase) });
            }
            catch (error) {
                next(error);
            }
        };
        this.updatePurchase = async (req, res, next) => {
            try {
                const updatedPurchase = await this.purchaseService.updatePurchase(req.body, req.params.id);
                res.success(response_messages_1.ResponseMessages.PURCHASE_UPDATE_SUCCESS, { purchase: (0, adminFilters_1.filterPurchase)(updatedPurchase) });
            }
            catch (error) {
                next(error);
            }
        };
        this.getPurchaseList = async (req, res, next) => {
            try {
                const skip = req.query.skip ? Number(req.query.skip) : 0;
                const limit = req.query.limit ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
                const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
                const orderId = req.query.orderId ? String(req.query.orderId) : null;
                const data = await this.purchaseService.getPurchaseList({ skip, limit, fromDate, toDate, orderId });
                res.success(response_messages_1.ResponseMessages.PURCHASE_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.deletePurchase = async (req, res, next) => {
            try {
                await this.purchaseService.deletePurchase(req.params.id);
                res.success(response_messages_1.ResponseMessages.PURCHASE_DELETE_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.exportPurchasesExcel = async (req, res, next) => {
            try {
                const purchaseIds = req.body.purchaseIds;
                const buffer = await this.purchaseService.exportPurchasesExcel(purchaseIds);
                res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
        this.getPurchaseDetails = async (req, res, next) => {
            try {
                const purchaseId = req.params.id;
                const { purchase, otherDetails } = await this.purchaseService.getPurchaseDetails(purchaseId);
                res.success(response_messages_1.ResponseMessages.PURCHASE_FOUND, { purchase: Object.assign(Object.assign({}, (0, adminFilters_1.filterPurchase)(purchase)), otherDetails) });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map