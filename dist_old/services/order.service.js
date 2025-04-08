"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonOrderService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const order_model_1 = require("../models/order.model");
const response_codes_1 = require("../response/response.codes");
const response_messages_1 = require("../response/response.messages");
const fileExport_1 = require("../utils/fileExport");
const helpers_1 = require("../utils/helpers");
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
let CommonOrderService = class CommonOrderService {
    async getOrderList(getData, user) {
        var _a;
        const findCondition = {};
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
            }
            else {
                findCondition.createdAt = { $lte: toDate };
            }
        }
        if (getData.fromCarats) {
            findCondition.totalCarats = { $gte: getData.fromCarats };
        }
        if (getData.toCarats) {
            if (findCondition.totalCarats) {
                findCondition.totalCarats.$lte = getData.toCarats;
            }
            else {
                findCondition.totalCarats = { $lte: getData.toCarats };
            }
        }
        if (getData.fromTotalItems) {
            findCondition.totalStones = { $gte: getData.fromTotalItems };
        }
        if (getData.toTotalItems) {
            if (findCondition.totalStones) {
                findCondition.totalStones.$lte = getData.toTotalItems;
            }
            else {
                findCondition.totalStones = { $lte: getData.toTotalItems };
            }
        }
        const totalAmountCondition = {};
        if (getData.fromAmount) {
            totalAmountCondition.totalAmount = { $gte: getData.fromAmount };
        }
        if (getData.toAmount) {
            if (totalAmountCondition.totalAmount) {
                totalAmountCondition.totalAmount.$lte = getData.toAmount;
            }
            else {
                totalAmountCondition.totalAmount = { $lte: getData.toAmount };
            }
        }
        const data = await order_model_1.OrderModel.aggregate([
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
            { $match: Object.assign(Object.assign({}, findCondition), totalAmountCondition) },
            { $count: 'totalCount' },
        ]);
        if (!data || !data.length || !((_a = data[0]) === null || _a === void 0 ? void 0 : _a.totalCount)) {
            return {
                orders: [],
                totalPages: 0,
                totalOrders: 0,
            };
        }
        const orders = await order_model_1.OrderModel.aggregate([
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
    async getOrderDetails(orderId, user) {
        const findCondition = { _id: orderId };
        if (user) {
            findCondition.user = user._id;
        }
        const findOrder = await order_model_1.OrderModel.findOne(findCondition).populate('user', { companyName: 1, email: 1 });
        if (!findOrder) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        findCondition._id = new mongoose_1.Types.ObjectId(orderId);
        const data = await order_model_1.OrderModel.aggregate([
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
    async exportOrdersExcel(orderIds, user, fromDate, toDate) {
        const findCondition = {};
        if (orderIds) {
            findCondition._id = { $in: orderIds.map(id => new mongoose_1.Types.ObjectId(id)) };
        }
        if (fromDate) {
            fromDate.setHours(0, 0, 0, 0);
            findCondition.createdAt = { $gte: fromDate };
        }
        if (toDate) {
            toDate.setHours(23, 59, 59, 999);
            if (findCondition.createdAt) {
                findCondition.createdAt.$lte = toDate;
            }
            else {
                findCondition.createdAt = { $lte: toDate };
            }
        }
        if (user) {
            findCondition.user = user._id;
        }
        const totalCount = await order_model_1.OrderModel.countDocuments(findCondition);
        if (!totalCount || totalCount === 0) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ORDER_NOT_FOUND);
        }
        const findOrders = await order_model_1.OrderModel.aggregate([
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
            return Object.assign({ orderNumber: order.orderNumber }, order.items);
        });
        const finalDiamondData = (0, helpers_1.formatOrderToExcelData)(data);
        const buffer = await (0, fileExport_1.getOrderExcelBuffer)(finalDiamondData, `Order Stone Details ${(0, helpers_1.formatDate)(new Date())}`, fromDate, toDate);
        return buffer;
    }
};
CommonOrderService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], CommonOrderService);
exports.CommonOrderService = CommonOrderService;
//# sourceMappingURL=order.service.js.map