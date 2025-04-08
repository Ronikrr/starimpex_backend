"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const userCartHistory_model_1 = require("../../models/userCartHistory.model");
const userPriceTrackHistory_model_1 = require("../../models/userPriceTrackHistory.model");
const users_model_1 = require("../../models/users.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = require("typedi");
let UserService = class UserService {
    async getUserList(getData) {
        const totalCount = await users_model_1.UserModel.countDocuments();
        if (totalCount === 0) {
            return {
                users: [],
                totalPage: 0,
            };
        }
        const users = await users_model_1.UserModel.find({}, adminFilters_1.filterUserProjection).sort({ updatedAt: -1 }).skip(getData.skip).limit(getData.limit);
        return {
            users,
            totalPage: Math.ceil(totalCount / getData.limit),
        };
    }
    async changeUserStatus(userId, updateData) {
        const updatedUser = await users_model_1.UserModel.findOneAndUpdate({ _id: userId }, { $set: { status: updateData === null || updateData === void 0 ? void 0 : updateData.status } }, { new: true });
        if (!updatedUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_UPDATE_ERROR);
        }
        return updatedUser;
    }
    async getUser(userId) {
        const user = await users_model_1.UserModel.findOne({ _id: userId });
        if (!user) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.USER_NOT_FOUND);
        }
        return user;
    }
    async getUserCartHistory(getData) {
        const findCondition = {};
        const fromDate = getData.fromDate ? getData.fromDate : null;
        const toDate = getData.toDate ? getData.toDate : null;
        if (fromDate) {
            fromDate.setHours(0, 0, 0, 0);
        }
        if (toDate) {
            toDate.setHours(23, 59, 59, 999);
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
        const totalCount = await userCartHistory_model_1.UserCartHistoryModel.countDocuments(findCondition);
        if (!totalCount || totalCount === 0) {
            return {
                totalPages: 0,
                cartHistory: [],
            };
        }
        const cartHistory = await userCartHistory_model_1.UserCartHistoryModel.find(findCondition, adminFilters_1.filterUserCartHistoryProjection)
            .populate('user', adminFilters_1.filterUserBasicDetailsProjection)
            .sort({ createdAt: -1 })
            .skip(getData.skip)
            .limit(getData.limit);
        return {
            totalPages: Math.ceil(totalCount / getData.limit),
            cartHistory,
        };
    }
    async getUserPriceTrackHistory(getData) {
        const findCondition = {};
        const fromDate = getData.fromDate ? getData.fromDate : null;
        const toDate = getData.toDate ? getData.toDate : null;
        if (fromDate) {
            fromDate.setHours(0, 0, 0, 0);
        }
        if (toDate) {
            toDate.setHours(23, 59, 59, 999);
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
        const totalCount = await userPriceTrackHistory_model_1.UserPriceTrackHistoryModel.countDocuments(findCondition);
        if (!totalCount || totalCount === 0) {
            return {
                totalPages: 0,
                priceTrackHistory: [],
            };
        }
        const priceTrackHistory = await userPriceTrackHistory_model_1.UserPriceTrackHistoryModel.find(findCondition, adminFilters_1.filterUserPriceTrackHistoryProjection)
            .populate('user', adminFilters_1.filterUserBasicDetailsProjection)
            .sort({ createdAt: -1 })
            .skip(getData.skip)
            .limit(getData.limit);
        return {
            totalPages: Math.ceil(totalCount / getData.limit),
            priceTrackHistory,
        };
    }
};
UserService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map