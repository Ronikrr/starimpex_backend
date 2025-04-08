"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCartService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const cart_model_1 = require("../../models/cart.model");
const diamonds_model_1 = require("../../models/diamonds.model");
const userDiamondNotes_model_1 = require("../../models/userDiamondNotes.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const userFilters_1 = require("../../utils/filters/userFilters");
const typedi_1 = require("typedi");
const notification_service_1 = tslib_1.__importDefault(require("../adminServices/notification.service"));
const adminSettings_model_1 = require("../../models/adminSettings.model");
const notification_interface_1 = require("../../interfaces/adminInterfaces/notification.interface");
const userCartHistory_model_1 = require("../../models/userCartHistory.model");
async function userAddToCartActionNotification(count, user) {
    var _a;
    const notificationService = new notification_service_1.default();
    const fcmToken = ((_a = (await adminSettings_model_1.AdminSettingsModel.findOne())) === null || _a === void 0 ? void 0 : _a.fcmTokens) || [];
    const notification = {
        title: 'New Items Added To Cart',
        body: `${user.fullName} has added ${count} ${count > 1 ? 'items' : 'item'} to cart`,
        type: notification_interface_1.ENotificationType.USER_ADD_TO_CART_ACTION,
        url: '/admin/cart',
    };
    await notificationService.createNotification(notification, fcmToken);
}
let UserCartService = class UserCartService {
    async addToCart(diamondIds, user) {
        const findDiamonds = await diamonds_model_1.DiamondModel.find({ _id: { $in: diamondIds }, isDeleted: false });
        if (findDiamonds.length !== diamondIds.length) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.ITEMS_SOLD_OUT);
        }
        const promiseArray = [];
        const stoneNoArray = [];
        for (const diamond of findDiamonds) {
            stoneNoArray.push(diamond.stoneNo);
            promiseArray.push(cart_model_1.CartModel.findOneAndUpdate({ userId: user._id, diamond: diamond._id }, {
                $set: {
                    userId: user._id,
                    diamond: diamond._id,
                    diamondSnapshot: diamond.toObject(),
                },
            }, { upsert: true, new: true }));
        }
        await Promise.allSettled(promiseArray);
        await userCartHistory_model_1.UserCartHistoryModel.create({ user: user._id, stoneNos: stoneNoArray.join(',') });
        const totalCount = await cart_model_1.CartModel.countDocuments({ userId: user._id });
        userAddToCartActionNotification(stoneNoArray.length, user);
        return { totalCount };
    }
    async deleteCartItem(diamondIds, user) {
        await cart_model_1.CartModel.deleteMany({ userId: user._id, diamond: { $in: diamondIds } });
    }
    async getCartItemList(getData, user) {
        const totalCount = await cart_model_1.CartModel.countDocuments({ userId: user._id });
        if (!totalCount) {
            return {
                totalPieces: 0,
                totalPages: 0,
                cart: [],
            };
        }
        const cartItems = await cart_model_1.CartModel.find({ userId: user._id }, userFilters_1.filterCartProjection)
            .sort({ updatedAt: -1 })
            .populate('diamond', userFilters_1.filterDiamondProjection)
            .skip(getData.skip)
            .limit(getData.limit);
        const diamondUniqueIds = cartItems.map(item => item.diamondSnapshot['uniqueStoneId']);
        const notesList = await userDiamondNotes_model_1.UserDiamondNotesModel.find({ user: user._id, uniqueStoneId: { $in: diamondUniqueIds } });
        const cart = cartItems.map(item => {
            var _a;
            const findNote = ((_a = notesList.find(data => data.uniqueStoneId === item.diamondSnapshot['uniqueStoneId'])) === null || _a === void 0 ? void 0 : _a.notes) || '';
            return Object.assign(Object.assign({}, item.toObject()), { diamondSnapshot: Object.assign(Object.assign({}, (0, userFilters_1.filterDiamond)(item.diamondSnapshot)), { userNotes: findNote }) });
        });
        return {
            totalPieces: totalCount,
            totalPages: Math.ceil(totalCount / getData.limit),
            cart,
        };
    }
};
UserCartService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserCartService);
exports.UserCartService = UserCartService;
//# sourceMappingURL=cart.service.js.map