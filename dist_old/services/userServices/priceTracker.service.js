"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTrackerService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const diamonds_model_1 = require("../../models/diamonds.model");
const priceTracker_model_1 = require("../../models/priceTracker.model");
const userDiamondNotes_model_1 = require("../../models/userDiamondNotes.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const userFilters_1 = require("../../utils/filters/userFilters");
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
const notification_service_1 = tslib_1.__importDefault(require("../adminServices/notification.service"));
const adminSettings_model_1 = require("../../models/adminSettings.model");
const notification_interface_1 = require("../../interfaces/adminInterfaces/notification.interface");
const userPriceTrackHistory_model_1 = require("../../models/userPriceTrackHistory.model");
async function userAddToPriceTrackerActionNotification(count, user) {
    var _a;
    const notificationService = new notification_service_1.default();
    const fcmToken = ((_a = (await adminSettings_model_1.AdminSettingsModel.findOne())) === null || _a === void 0 ? void 0 : _a.fcmTokens) || [];
    const notification = {
        title: 'New Items Added To Price Track',
        body: `${user.fullName} has added ${count} ${count > 1 ? 'items' : 'item'} to price track`,
        type: notification_interface_1.ENotificationType.USER_ADD_TO_PRICE_TRACK_ACTION,
        url: '/admin/price-track',
    };
    await notificationService.createNotification(notification, fcmToken);
}
let PriceTrackerService = class PriceTrackerService {
    async addToPriceTracker(data, user) {
        const findDiamonds = await diamonds_model_1.DiamondModel.find({ _id: { $in: data.diamondIds }, isDeleted: false });
        if (findDiamonds.length !== data.diamondIds.length) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.PRICE_TRACKER_ITEMS_SOLD_OUT_ERROR);
        }
        const promiseArray = [];
        const stoneNoArray = [];
        for (const diamond of findDiamonds) {
            stoneNoArray.push(diamond.stoneNo);
            promiseArray.push(priceTracker_model_1.PriceTrackerModel.findOneAndUpdate({ user: user._id, 'diamondSnapshot.uniqueStoneId': diamond.uniqueStoneId }, {
                $set: {
                    user: user._id,
                    diamondSnapshot: diamond.toObject(),
                },
            }, { upsert: true, new: true }));
        }
        await Promise.allSettled(promiseArray);
        await userPriceTrackHistory_model_1.UserPriceTrackHistoryModel.create({ user: user._id, stoneNos: stoneNoArray.join(',') });
        userAddToPriceTrackerActionNotification(stoneNoArray.length, user);
    }
    async getPriceTrackList(getData, user) {
        const totalCount = await priceTracker_model_1.PriceTrackerModel.countDocuments({ user: user._id });
        if (!totalCount) {
            return {
                totalTrackItems: 0,
                totalPages: 0,
                priceTrackList: [],
            };
        }
        const priceTrack = await priceTracker_model_1.PriceTrackerModel.find({ user: user._id }, userFilters_1.filterPriceTrackerProjection)
            .sort({ updatedAt: -1 })
            .skip(getData.skip)
            .limit(getData.limit);
        const diamondUniqueIds = priceTrack.map(item => item.diamondSnapshot['uniqueStoneId']);
        const diamonds = await diamonds_model_1.DiamondModel.find({ uniqueStoneId: { $in: diamondUniqueIds } });
        const notesList = await userDiamondNotes_model_1.UserDiamondNotesModel.find({ user: user._id, uniqueStoneId: { $in: diamondUniqueIds } });
        const priceTrackList = priceTrack.map(item => {
            var _a;
            const findNote = ((_a = notesList.find(data => data.uniqueStoneId === item.diamondSnapshot['uniqueStoneId'])) === null || _a === void 0 ? void 0 : _a.notes) || '';
            const findDiamond = diamonds.find(diamond => diamond.uniqueStoneId === item.diamondSnapshot['uniqueStoneId']);
            return Object.assign(Object.assign({}, item.toObject()), { diamondSnapshot: Object.assign(Object.assign({}, (0, userFilters_1.filterDiamond)(item.diamondSnapshot)), { userNotes: findNote }), diamond: findDiamond ? (0, userFilters_1.filterDiamond)(findDiamond) : null });
        });
        return {
            totalTrackItems: totalCount,
            totalPages: Math.ceil(totalCount / getData.limit),
            priceTrackList,
        };
    }
    async removeFromPriceTracker(data, user) {
        const diamondIds = data.diamondIds.map(id => new mongoose_1.Types.ObjectId(id));
        await priceTracker_model_1.PriceTrackerModel.deleteMany({ user: user._id, 'diamondSnapshot._id': { $in: diamondIds } });
    }
};
PriceTrackerService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], PriceTrackerService);
exports.PriceTrackerService = PriceTrackerService;
//# sourceMappingURL=priceTracker.service.js.map