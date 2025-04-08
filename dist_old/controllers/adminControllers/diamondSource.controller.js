"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondSourceController = void 0;
const tslib_1 = require("tslib");
const response_messages_1 = require("../../response/response.messages");
const diamondSource_service_1 = require("../../services/adminServices/diamondSource.service");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class DiamondSourceController {
    constructor() {
        this.diamondSourceService = typedi_1.default.get(diamondSource_service_1.DiamondSourceService);
        this.getDiamondSourceList = async (req, res, next) => {
            try {
                const data = await this.diamondSourceService.getDiamondSourceList();
                res.success(response_messages_1.ResponseMessages.DIAMOND_SOURCE_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.enableDisableDiamondSource = async (req, res, next) => {
            try {
                const getData = req.body;
                const data = await this.diamondSourceService.enableDisableDiamondSource(getData);
                res.success(getData.isDisabled ? response_messages_1.ResponseMessages.DIAMOND_SOURCE_DISABLED_SUCCESS : response_messages_1.ResponseMessages.DIAMOND_SOURCE_ENABLED_SUCCESS, (0, adminFilters_1.filterDiamondSource)(data));
            }
            catch (error) {
                next(error);
            }
        };
        this.updateMarkupPercentage = async (req, res, next) => {
            try {
                const getData = req.body;
                const data = await this.diamondSourceService.updateMarkupPercentage(getData);
                res.success(response_messages_1.ResponseMessages.DIAMOND_SOURCE_UPDATE_SUCCESS, (0, adminFilters_1.filterDiamondSource)(data));
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.DiamondSourceController = DiamondSourceController;
//# sourceMappingURL=diamondSource.controller.js.map