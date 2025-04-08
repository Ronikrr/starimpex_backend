"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondSourceService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const cart_model_1 = require("../../models/cart.model");
const diamondSources_model_1 = require("../../models/diamondSources.model");
const diamonds_model_1 = require("../../models/diamonds.model");
const priceTracker_model_1 = require("../../models/priceTracker.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = require("typedi");
let DiamondSourceService = class DiamondSourceService {
    async getDiamondSourceList() {
        const dimondSources = await diamondSources_model_1.DiamondSourceModel.find({}, adminFilters_1.filterDiamondSourceProjection);
        return dimondSources;
    }
    async enableDisableDiamondSource(getData) {
        if (getData.sourceType === diamonds_interface_1.ESourceType.FILE) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.CHANGE_STATUS_FILE_SOURCE_ERROR);
        }
        const updatedDiamondSource = await diamondSources_model_1.DiamondSourceModel.findOneAndUpdate({ sourceType: getData.sourceType }, { $set: { isDisabled: getData.isDisabled } }, { new: true });
        if (!updatedDiamondSource) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.DIAMOND_SOURCE_UPDATE_ERROR);
        }
        await diamonds_model_1.DiamondModel.updateMany({ source: getData.sourceType }, { $set: { isDeleted: getData.isDisabled } });
        if (getData.isDisabled) {
            await cart_model_1.CartModel.deleteMany({ 'diamondSnapshot.source': getData.sourceType });
            await priceTracker_model_1.PriceTrackerModel.deleteMany({ 'diamondSnapshot.source': getData.sourceType });
        }
        return updatedDiamondSource;
    }
    async updateMarkupPercentage(getData) {
        if (getData.sourceType === diamonds_interface_1.ESourceType.FILE) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPDATE_MARKUP_FILE_SOURCE_ERROR);
        }
        const updatedDiamondSource = await diamondSources_model_1.DiamondSourceModel.findOneAndUpdate({ sourceType: getData.sourceType }, { $set: { markupPercentage: getData.markupPercentage } }, { new: true });
        if (!updatedDiamondSource) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.DIAMOND_SOURCE_UPDATE_ERROR);
        }
        return updatedDiamondSource;
    }
};
DiamondSourceService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], DiamondSourceService);
exports.DiamondSourceService = DiamondSourceService;
//# sourceMappingURL=diamondSource.service.js.map