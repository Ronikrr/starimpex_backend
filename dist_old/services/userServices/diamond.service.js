"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDiamondService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const diamonds_model_1 = require("../../models/diamonds.model");
const searchHistory_model_1 = require("../../models/searchHistory.model");
const userDiamondNotes_model_1 = require("../../models/userDiamondNotes.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const typedi_1 = tslib_1.__importStar(require("typedi"));
const diamond_service_1 = require("../diamond.service");
let UserDiamondService = class UserDiamondService {
    constructor() {
        this.commonDiamondService = typedi_1.default.get(diamond_service_1.DiamondService);
    }
    async addDiamondNotes(data, user) {
        const diamondIds = data.diamondNotes.map(data => data.diamondId);
        const findDiamonds = await diamonds_model_1.DiamondModel.find({ _id: { $in: diamondIds } });
        if (findDiamonds.length !== diamondIds.length) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.DIAMOND_NOT_FOUND);
        }
        const promiseArray = [];
        for (let index = 0; index < data.diamondNotes.length; index++) {
            const findDiamond = findDiamonds.find(diamond => diamond._id.toString() === data.diamondNotes[index].diamondId);
            promiseArray.push(userDiamondNotes_model_1.UserDiamondNotesModel.findOneAndUpdate({ uniqueStoneId: findDiamond.uniqueStoneId, user: user._id }, { $set: { notes: data.diamondNotes[index].notes } }, { upsert: true }));
        }
        await Promise.allSettled(promiseArray);
    }
    async saveDiamondSearch(filters, user) {
        const result = await this.commonDiamondService.getDiamondList(filters);
        await searchHistory_model_1.SearchHistoryModel.create({
            user: user._id,
            filters,
            totalStones: result.totalCount,
        });
    }
};
UserDiamondService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserDiamondService);
exports.UserDiamondService = UserDiamondService;
//# sourceMappingURL=diamond.service.js.map