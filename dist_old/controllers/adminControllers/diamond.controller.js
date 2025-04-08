"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const diamond_service_1 = require("../../services/adminServices/diamond.service");
const diamond_service_2 = require("../../services/diamond.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class DiamondController {
    constructor() {
        this.commonDiamondService = typedi_1.default.get(diamond_service_2.DiamondService);
        this.diamondService = typedi_1.default.get(diamond_service_1.DiamondService);
        this.getDiamondList = async (req, res, next) => {
            try {
                const diamondType = req.query.diamondType ? String(req.query.diamondType) : null;
                const shapeList = req.query.shapeList ? JSON.parse(String(req.query.shapeList)) : null;
                const labList = req.query.labList ? JSON.parse(String(req.query.labList)) : null;
                const caratWeightList = req.query.caratWeightList ? JSON.parse(String(req.query.caratWeightList)) : null;
                const colorList = req.query.colorList ? JSON.parse(String(req.query.colorList)) : null;
                const noBGM = req.query.noBGM ? req.query.noBGM === 'true' : null;
                const isFancyColor = req.query.isFancyColor ? req.query.isFancyColor === 'true' : null;
                const fancyColorList = req.query.fancyColorList ? JSON.parse(String(req.query.fancyColorList)) : null;
                const fancyIntensityList = req.query.fancyIntensityList ? JSON.parse(String(req.query.fancyIntensityList)) : null;
                const fancyOvertoneList = req.query.fancyOvertoneList ? JSON.parse(String(req.query.fancyOvertoneList)) : null;
                const clarityList = req.query.clarityList ? JSON.parse(String(req.query.clarityList)) : null;
                const cutList = req.query.cutList ? JSON.parse(String(req.query.cutList)) : null;
                const polishList = req.query.polishList ? JSON.parse(String(req.query.polishList)) : null;
                const symmetryList = req.query.symmetryList ? JSON.parse(String(req.query.symmetryList)) : null;
                const florescenceList = req.query.florescenceList ? JSON.parse(String(req.query.florescenceList)) : null;
                const countryList = req.query.countryList ? JSON.parse(String(req.query.countryList)) : null;
                const eyeCleanList = req.query.eyeCleanList ? JSON.parse(String(req.query.eyeCleanList)) : null;
                const typeList = req.query.typeList ? JSON.parse(String(req.query.typeList)) : null;
                const discountRange = req.query.discountRange ? JSON.parse(String(req.query.discountRange)) : null;
                const pricePerCaratRange = req.query.pricePerCaratRange ? JSON.parse(String(req.query.pricePerCaratRange)) : null;
                const totalPriceRange = req.query.totalPriceRange ? JSON.parse(String(req.query.totalPriceRange)) : null;
                const tablePercentageRange = req.query.tablePercentageRange ? JSON.parse(String(req.query.tablePercentageRange)) : null;
                const depthPercentageRange = req.query.depthPercentageRange ? JSON.parse(String(req.query.depthPercentageRange)) : null;
                const lengthRange = req.query.lengthRange ? JSON.parse(String(req.query.lengthRange)) : null;
                const widthRange = req.query.widthRange ? JSON.parse(String(req.query.widthRange)) : null;
                const ratioRange = req.query.ratioRange ? JSON.parse(String(req.query.ratioRange)) : null;
                const crownHeightRange = req.query.crownHeightRange ? JSON.parse(String(req.query.crownHeightRange)) : null;
                const crownAngleRange = req.query.crownAngleRange ? JSON.parse(String(req.query.crownAngleRange)) : null;
                const pavilionHeightRange = req.query.pavilionHeightRange ? JSON.parse(String(req.query.pavilionHeightRange)) : null;
                const pavilionAngleRange = req.query.pavilionAngleRange ? JSON.parse(String(req.query.pavilionAngleRange)) : null;
                const girdlePercentageRange = req.query.girdlePercentageRange ? JSON.parse(String(req.query.girdlePercentageRange)) : null;
                const culetSizeList = req.query.culetSizeList ? JSON.parse(String(req.query.culetSizeList)) : null;
                const keyToSymbolIncludeList = req.query.keyToSymbolIncludeList ? JSON.parse(String(req.query.keyToSymbolIncludeList)) : null;
                const keyToSymbolExcludeList = req.query.keyToSymbolExcludeList ? JSON.parse(String(req.query.keyToSymbolExcludeList)) : null;
                const limit = req.query.limit ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = req.query.skip ? Number(req.query.skip) : 0;
                const stoneIds = req.query.stoneIds ? String(req.query.stoneIds) : '';
                const sortOrder = req.query.sortOrder ? JSON.parse(String(req.query.sortOrder)) : null;
                const data = await this.commonDiamondService.getDiamondList({
                    diamondType,
                    shapeList,
                    labList,
                    caratWeightList,
                    colorList,
                    noBGM,
                    isFancyColor,
                    fancyColorList,
                    fancyIntensityList,
                    fancyOvertoneList,
                    clarityList,
                    cutList,
                    polishList,
                    symmetryList,
                    florescenceList,
                    countryList,
                    eyeCleanList,
                    typeList,
                    discountRange,
                    pricePerCaratRange,
                    totalPriceRange,
                    tablePercentageRange,
                    depthPercentageRange,
                    lengthRange,
                    widthRange,
                    ratioRange,
                    crownHeightRange,
                    crownAngleRange,
                    pavilionHeightRange,
                    pavilionAngleRange,
                    girdlePercentageRange,
                    culetSizeList,
                    keyToSymbolIncludeList,
                    keyToSymbolExcludeList,
                    limit,
                    skip,
                    stoneIds,
                    sortOrder,
                });
                res.success(response_messages_1.ResponseMessages.DIAMOND_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDiamond = async (req, res, next) => {
            try {
                const diamond = await this.commonDiamondService.getDiamond(req.params.id);
                res.success(response_messages_1.ResponseMessages.DIAMOND_FOUND, diamond);
            }
            catch (error) {
                next(error);
            }
        };
        this.exportDiamondsToExcel = async (req, res, next) => {
            try {
                const diamondIds = req.body.diamondIds;
                const buffer = await this.commonDiamondService.exportDiamondsToExcel(diamondIds);
                res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
        this.sendDiamondExcelMail = async (req, res, next) => {
            try {
                await this.commonDiamondService.sendDiamondExcelMail(req.body);
                res.success(response_messages_1.ResponseMessages.SEND_EMAIL_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadViaFile = async (req, res, next) => {
            try {
                const file = req.file;
                await this.diamondService.uploadViaFile(file);
                res.success(response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDiamondUploadFile = async (req, res, next) => {
            try {
                const buffer = await this.diamondService.getDiamondUploadFile();
                res.set('Content-Disposition', `attachment;filename=upload.xlsx`);
                res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.send(buffer);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.DiamondController = DiamondController;
//# sourceMappingURL=diamond.controller.js.map