"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const order_model_1 = require("../../models/order.model");
const purchase_model_1 = require("../../models/purchase.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const fileExport_1 = require("../../utils/fileExport");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const helpers_1 = require("../../utils/helpers");
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
let PurchaseService = class PurchaseService {
    async createPurchase(data) {
        const stoneIds = data.items.map(item => item.stoneId);
        if (stoneIds.length !== new Set(stoneIds).size) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_CREATE_FAILED_FOUND_DUPLICATE_ITEMS);
        }
        const findPurchase = await purchase_model_1.PurchaseModel.findOne({ orderId: data.orderId, 'items.stoneNo': { $in: stoneIds }, isDeleted: false });
        if (findPurchase) {
            const removeStoneIds = findPurchase.items.map((item) => item.stoneNo);
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_ALREADY_EXISTS, { removeStoneIds });
        }
        const findOrder = await order_model_1.OrderModel.findOne({ orderNumber: data.orderId, 'items.stoneNo': { $in: stoneIds } });
        if (!findOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        const items = [];
        data.items.map(item => {
            const findOrderItem = findOrder.items.find(orderItem => item.stoneId === orderItem.stoneNo);
            if (findOrderItem) {
                const { finalDiscount, finalPrice, finalRap, finalTotalPrice } = item;
                items.push(Object.assign(Object.assign({}, findOrderItem), { finalDiscount, finalPrice, finalRap, finalTotalPrice }));
            }
        });
        const createPurchaseData = {
            orderId: data.orderId,
            date: data.date,
            supplierName: (data === null || data === void 0 ? void 0 : data.supplierName) || null,
            supplierAddress: (data === null || data === void 0 ? void 0 : data.supplierAddress) || null,
            description: (data === null || data === void 0 ? void 0 : data.description) || null,
            items: items,
        };
        const createdPurchase = await purchase_model_1.PurchaseModel.create(createPurchaseData);
        return createdPurchase;
    }
    async updatePurchase(data, purchaseId) {
        const stoneIds = data.items.map(item => item.stoneId);
        if (stoneIds.length !== new Set(stoneIds).size) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_UPDATE_FAILED_FOUND_DUPLICATE_ITEMS);
        }
        const findPurchase = await purchase_model_1.PurchaseModel.findOne({
            _id: { $ne: purchaseId },
            orderId: data.orderId,
            'items.stoneNo': { $in: stoneIds },
            isDeleted: false,
        });
        if (findPurchase) {
            const removeStoneIds = findPurchase.items.map((item) => item.stoneNo);
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_ALREADY_EXISTS, { removeStoneIds });
        }
        const findOrder = await order_model_1.OrderModel.findOne({ orderNumber: data.orderId, 'items.stoneNo': { $in: stoneIds } });
        if (!findOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        const items = [];
        data.items.forEach(item => {
            const findOrderItem = findOrder.items.find(orderItem => item.stoneId === orderItem.stoneNo);
            if (findOrderItem) {
                const { finalDiscount, finalPrice, finalRap, finalTotalPrice } = item;
                items.push(Object.assign(Object.assign({}, findOrderItem), { finalDiscount, finalPrice, finalRap, finalTotalPrice }));
            }
        });
        const updatePurchaseData = {
            date: data.date,
            supplierName: (data === null || data === void 0 ? void 0 : data.supplierName) || null,
            supplierAddress: (data === null || data === void 0 ? void 0 : data.supplierAddress) || null,
            description: (data === null || data === void 0 ? void 0 : data.description) || null,
            items: items,
        };
        const updatedPurchase = await purchase_model_1.PurchaseModel.findOneAndUpdate({ _id: purchaseId }, { $set: updatePurchaseData }, { new: true });
        if (!updatedPurchase) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_NOT_FOUND);
        }
        return updatedPurchase;
    }
    async getPurchaseList(getData) {
        const totalCount = await purchase_model_1.PurchaseModel.countDocuments({ isDeleted: false });
        if (!totalCount || totalCount === 0) {
            return {
                purchases: [],
                totalPages: 0,
                totalCount: 0,
            };
        }
        const findCondition = { isDeleted: false };
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
            }
            else {
                findCondition.date = { $lte: toDate };
            }
        }
        if (getData.orderId) {
            findCondition.orderId = { $eq: getData.orderId.toUpperCase() };
        }
        const purchases = await purchase_model_1.PurchaseModel.find(findCondition, adminFilters_1.filterPurchaseProjection).sort({ date: -1 }).skip(getData.skip).limit(getData.limit);
        return {
            purchases,
            totalPages: Math.ceil(totalCount / getData.limit),
            totalCount,
        };
    }
    async deletePurchase(purchaseId) {
        const updatedPurchase = await purchase_model_1.PurchaseModel.findOneAndUpdate({ _id: purchaseId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
        if (!updatedPurchase) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_NOT_FOUND);
        }
    }
    async exportPurchasesExcel(purchaseIds, fromDate, toDate) {
        const findCondition = {};
        if (purchaseIds) {
            findCondition._id = { $in: purchaseIds.map(id => new mongoose_1.Types.ObjectId(id)) };
        }
        if (fromDate) {
            fromDate.setHours(0, 0, 0, 0);
            findCondition.date = { $gte: fromDate };
        }
        if (toDate) {
            toDate.setHours(23, 59, 59, 999);
            if (findCondition.date) {
                findCondition.date.$lte = toDate;
            }
            else {
                findCondition.date = { $lte: toDate };
            }
        }
        const totalCount = await purchase_model_1.PurchaseModel.countDocuments(findCondition);
        if (!totalCount || totalCount === 0) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_NOT_FOUND);
        }
        const findPurchases = await purchase_model_1.PurchaseModel.aggregate([
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
            return Object.assign({ orderNumber: purchase.orderId, date: new Date(purchase.date).toISOString() }, purchase.items);
        });
        const finalDiamondData = (0, helpers_1.formatPurchaseToExcelData)(data);
        const buffer = await (0, fileExport_1.getPurchaseExcelBuffer)(finalDiamondData, `Purchase Report ${(0, helpers_1.formatDate)(new Date())}`, fromDate, toDate);
        return buffer;
    }
    async getPurchaseDetails(purchaseId) {
        const findPurchase = await purchase_model_1.PurchaseModel.findOne({ _id: purchaseId });
        if (!findPurchase) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PURCHASE_NOT_FOUND);
        }
        const totalStones = findPurchase.items.length;
        let totalCarats = 0;
        let totalAmount = 0;
        findPurchase.items.forEach((item) => {
            totalCarats += (item === null || item === void 0 ? void 0 : item.finalPrice) || 0;
            totalAmount += (item === null || item === void 0 ? void 0 : item.finalTotalPrice) || 0;
        });
        return { purchase: findPurchase, otherDetails: { totalStones, totalCarats: totalCarats.toFixed(2), totalAmount: totalAmount.toFixed(2) } };
    }
};
PurchaseService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], PurchaseService);
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map