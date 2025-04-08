"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondService = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
const diamonds_model_1 = require("../models/diamonds.model");
const userDiamondNotes_model_1 = require("../models/userDiamondNotes.model");
const response_codes_1 = require("../response/response.codes");
const response_messages_1 = require("../response/response.messages");
const diamond_1 = require("../utils/diamond");
const fileExport_1 = require("../utils/fileExport");
const userFilters_1 = require("../utils/filters/userFilters");
const helpers_1 = require("../utils/helpers");
const mailer_1 = require("../utils/mailer");
const typedi_1 = require("typedi");
let DiamondService = class DiamondService {
    async getDiamondList(getData, user) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        const eyeCleanEnumValues = Object.values(diamonds_interface_1.EDiamondEyeClean);
        const isEyeCleanListValid = getData.eyeCleanList ? getData.eyeCleanList.every(value => eyeCleanEnumValues.includes(value)) : true;
        if (!isEyeCleanListValid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.DIAMOND_EYE_CLEAN_FILTER_ERROR);
        }
        const isFancyColor = typeof getData.isFancyColor === 'boolean' && getData.isFancyColor;
        const findCondition = { isDeleted: false };
        if (getData.diamondType) {
            findCondition.diamondType = getData.diamondType;
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.shapeList) && getData.shapeList.length > 0) {
            const shapeFilters = getData.shapeList.map(shape => String(shape).toLowerCase().trim());
            const includeOtherShapes = shapeFilters.includes(diamond_1.SHAPE_OTHERS_OPTION);
            if (includeOtherShapes) {
                const excludeShapes = [];
                for (const key in diamond_1.mainShapes) {
                    if (!shapeFilters.includes(key)) {
                        excludeShapes.push(...diamond_1.mainShapes[key]);
                    }
                }
                findCondition.shape = { $nin: excludeShapes };
            }
            else {
                const includeShapes = [];
                for (const key in diamond_1.mainShapes) {
                    if (shapeFilters.includes(key)) {
                        includeShapes.push(...diamond_1.mainShapes[key]);
                    }
                }
                findCondition.shape = { $in: includeShapes };
            }
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.labList) && getData.labList.length > 0) {
            findCondition.lab = { $in: getData.labList.map(lab => lab.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.caratWeightList) && getData.caratWeightList.length > 0) {
            const caratCondition = [];
            getData.caratWeightList.forEach(carat => {
                const caratWeightRangeCondition = {};
                if (carat.from) {
                    caratWeightRangeCondition.$gte = carat.from;
                }
                if (carat.to) {
                    caratWeightRangeCondition.$lte = carat.to;
                }
                caratCondition.push({ caratWeight: caratWeightRangeCondition });
            });
            findCondition.$or = caratCondition;
        }
        if (!isFancyColor && (getData === null || getData === void 0 ? void 0 : getData.colorList) && getData.colorList.length > 0) {
            findCondition.color = { $in: getData.colorList.map(color => color.toLowerCase()) };
        }
        if (!isFancyColor && (!(getData === null || getData === void 0 ? void 0 : getData.colorList) || getData.colorList.length === 0)) {
            findCondition.color = { $ne: null };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.noBGM) !== null) {
            findCondition.noBGM = getData.noBGM;
        }
        if (isFancyColor && (getData === null || getData === void 0 ? void 0 : getData.fancyColorList) && getData.fancyColorList.length > 0) {
            findCondition.fancyColor = { $in: getData.fancyColorList.map(fancyColor => fancyColor.toLowerCase()) };
        }
        if (isFancyColor && (!(getData === null || getData === void 0 ? void 0 : getData.fancyColorList) || getData.fancyColorList.length === 0)) {
            findCondition.fancyColor = { $ne: null };
        }
        if (isFancyColor && (getData === null || getData === void 0 ? void 0 : getData.fancyIntensityList) && getData.fancyIntensityList.length > 0) {
            findCondition.fancyIntensity = { $in: getData.fancyIntensityList.map(fancyIntensity => fancyIntensity.toLowerCase()) };
        }
        if (isFancyColor && (getData === null || getData === void 0 ? void 0 : getData.fancyOvertoneList) && getData.fancyOvertoneList.length > 0) {
            findCondition.fancyOvertone = { $in: getData.fancyOvertoneList.map(fancyOvertone => fancyOvertone.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.clarityList) && getData.clarityList.length > 0) {
            findCondition.clarity = { $in: getData.clarityList.map(clarity => clarity.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.cutList) && getData.cutList.length > 0) {
            findCondition.cut = { $in: getData.cutList.map(cut => cut.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.polishList) && getData.polishList.length > 0) {
            findCondition.polish = { $in: getData.polishList.map(polish => polish.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.symmetryList) && getData.symmetryList.length > 0) {
            findCondition.symmetry = { $in: getData.symmetryList.map(symmetry => symmetry.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.florescenceList) && getData.florescenceList.length > 0) {
            findCondition.florescence = { $in: getData.florescenceList.map(florescence => florescence.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.countryList) && getData.countryList.length > 0) {
            findCondition.country = { $in: getData.countryList.map(country => country.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.eyeCleanList) && getData.eyeCleanList.length > 0) {
            const eyeCleanCondition = [];
            getData.eyeCleanList.forEach(eyeClean => {
                eyeCleanCondition.push({ eyeClean: (0, helpers_1.getEyeCleanCondition)(eyeClean) });
            });
            if (findCondition.$or) {
                findCondition.$and = [{ $or: findCondition.$or }, { $or: eyeCleanCondition }];
                delete findCondition.$or;
            }
            else {
                findCondition.$or = eyeCleanCondition;
            }
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.typeList) && getData.typeList.length > 0) {
            findCondition.type = { $in: getData.typeList.map(type => type.toLowerCase()) };
        }
        if ((_a = getData === null || getData === void 0 ? void 0 : getData.discountRange) === null || _a === void 0 ? void 0 : _a.to) {
            findCondition.ourDiscount = { $gte: -getData.discountRange.to };
        }
        if ((_b = getData === null || getData === void 0 ? void 0 : getData.discountRange) === null || _b === void 0 ? void 0 : _b.from) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.ourDiscount) {
                findCondition.ourDiscount.$lte = -getData.discountRange.from;
            }
            else {
                findCondition.ourDiscount = { $lte: -getData.discountRange.from };
            }
        }
        if ((_c = getData === null || getData === void 0 ? void 0 : getData.pricePerCaratRange) === null || _c === void 0 ? void 0 : _c.from) {
            findCondition.pricePerCarat = { $gte: getData.pricePerCaratRange.from };
        }
        if ((_d = getData === null || getData === void 0 ? void 0 : getData.pricePerCaratRange) === null || _d === void 0 ? void 0 : _d.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.pricePerCarat) {
                findCondition.pricePerCarat.$lte = getData.pricePerCaratRange.to;
            }
            else {
                findCondition.pricePerCarat = { $lte: getData.pricePerCaratRange.to };
            }
        }
        if ((_e = getData === null || getData === void 0 ? void 0 : getData.totalPriceRange) === null || _e === void 0 ? void 0 : _e.from) {
            findCondition.ourPrice = { $gte: getData.totalPriceRange.from };
        }
        if ((_f = getData === null || getData === void 0 ? void 0 : getData.totalPriceRange) === null || _f === void 0 ? void 0 : _f.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.ourPrice) {
                findCondition.ourPrice.$lte = getData.totalPriceRange.to;
            }
            else {
                findCondition.ourPrice = { $lte: getData.totalPriceRange.to };
            }
        }
        if ((_g = getData === null || getData === void 0 ? void 0 : getData.tablePercentageRange) === null || _g === void 0 ? void 0 : _g.from) {
            findCondition.tablePercentage = { $gte: getData.tablePercentageRange.from };
        }
        if ((_h = getData === null || getData === void 0 ? void 0 : getData.tablePercentageRange) === null || _h === void 0 ? void 0 : _h.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.tablePercentage) {
                findCondition.tablePercentage.$lte = getData.tablePercentageRange.to;
            }
            else {
                findCondition.tablePercentage = { $lte: getData.tablePercentageRange.to };
            }
        }
        if ((_j = getData === null || getData === void 0 ? void 0 : getData.depthPercentageRange) === null || _j === void 0 ? void 0 : _j.from) {
            findCondition.depthPercentage = { $gte: getData.depthPercentageRange.from };
        }
        if ((_k = getData === null || getData === void 0 ? void 0 : getData.depthPercentageRange) === null || _k === void 0 ? void 0 : _k.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.depthPercentage) {
                findCondition.depthPercentage.$lte = getData.depthPercentageRange.to;
            }
            else {
                findCondition.depthPercentage = { $lte: getData.depthPercentageRange.to };
            }
        }
        if ((_l = getData === null || getData === void 0 ? void 0 : getData.lengthRange) === null || _l === void 0 ? void 0 : _l.from) {
            findCondition.length = { $gte: getData.lengthRange.from };
        }
        if ((_m = getData === null || getData === void 0 ? void 0 : getData.lengthRange) === null || _m === void 0 ? void 0 : _m.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.length) {
                findCondition.length.$lte = getData.lengthRange.to;
            }
            else {
                findCondition.length = { $lte: getData.lengthRange.to };
            }
        }
        if ((_o = getData === null || getData === void 0 ? void 0 : getData.widthRange) === null || _o === void 0 ? void 0 : _o.from) {
            findCondition.width = { $gte: getData.widthRange.from };
        }
        if ((_p = getData === null || getData === void 0 ? void 0 : getData.widthRange) === null || _p === void 0 ? void 0 : _p.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.width) {
                findCondition.width.$lte = getData.widthRange.to;
            }
            else {
                findCondition.width = { $lte: getData.widthRange.to };
            }
        }
        if ((_q = getData === null || getData === void 0 ? void 0 : getData.ratioRange) === null || _q === void 0 ? void 0 : _q.from) {
            findCondition.ratio = { $gte: getData.ratioRange.from };
        }
        if ((_r = getData === null || getData === void 0 ? void 0 : getData.ratioRange) === null || _r === void 0 ? void 0 : _r.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.ratio) {
                findCondition.ratio.$lte = getData.ratioRange.to;
            }
            else {
                findCondition.ratio = { $lte: getData.ratioRange.to };
            }
        }
        if ((_s = getData === null || getData === void 0 ? void 0 : getData.crownHeightRange) === null || _s === void 0 ? void 0 : _s.from) {
            findCondition.crownHeight = { $gte: getData.crownHeightRange.from };
        }
        if ((_t = getData === null || getData === void 0 ? void 0 : getData.crownHeightRange) === null || _t === void 0 ? void 0 : _t.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.crownHeight) {
                findCondition.crownHeight.$lte = getData.crownHeightRange.to;
            }
            else {
                findCondition.crownHeight = { $lte: getData.crownHeightRange.to };
            }
        }
        if ((_u = getData === null || getData === void 0 ? void 0 : getData.crownAngleRange) === null || _u === void 0 ? void 0 : _u.from) {
            findCondition.crownAngle = { $gte: getData.crownAngleRange.from };
        }
        if ((_v = getData === null || getData === void 0 ? void 0 : getData.crownAngleRange) === null || _v === void 0 ? void 0 : _v.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.crownAngle) {
                findCondition.crownAngle.$lte = getData.crownAngleRange.to;
            }
            else {
                findCondition.crownAngle = { $lte: getData.crownAngleRange.to };
            }
        }
        if ((_w = getData === null || getData === void 0 ? void 0 : getData.pavilionHeightRange) === null || _w === void 0 ? void 0 : _w.from) {
            findCondition.pavilionHeight = { $gte: getData.pavilionHeightRange.from };
        }
        if ((_x = getData === null || getData === void 0 ? void 0 : getData.pavilionHeightRange) === null || _x === void 0 ? void 0 : _x.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.pavilionHeight) {
                findCondition.pavilionHeight.$lte = getData.pavilionHeightRange.to;
            }
            else {
                findCondition.pavilionHeight = { $lte: getData.pavilionHeightRange.to };
            }
        }
        if ((_y = getData === null || getData === void 0 ? void 0 : getData.pavilionAngleRange) === null || _y === void 0 ? void 0 : _y.from) {
            findCondition.pavilionAngle = { $gte: getData.pavilionAngleRange.from };
        }
        if ((_z = getData === null || getData === void 0 ? void 0 : getData.pavilionAngleRange) === null || _z === void 0 ? void 0 : _z.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.pavilionAngle) {
                findCondition.pavilionAngle.$lte = getData.pavilionAngleRange.to;
            }
            else {
                findCondition.pavilionAngle = { $lte: getData.pavilionAngleRange.to };
            }
        }
        if ((_0 = getData === null || getData === void 0 ? void 0 : getData.girdlePercentageRange) === null || _0 === void 0 ? void 0 : _0.from) {
            findCondition.girdlePercentage = { $gte: getData.girdlePercentageRange.from };
        }
        if ((_1 = getData === null || getData === void 0 ? void 0 : getData.girdlePercentageRange) === null || _1 === void 0 ? void 0 : _1.to) {
            if (findCondition === null || findCondition === void 0 ? void 0 : findCondition.girdlePercentage) {
                findCondition.girdlePercentage.$lte = getData.girdlePercentageRange.to;
            }
            else {
                findCondition.girdlePercentage = { $lte: getData.girdlePercentageRange.to };
            }
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.culetSizeList) && getData.culetSizeList.length > 0) {
            findCondition.culetSize = { $in: getData.culetSizeList.map(culetSize => culetSize.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.keyToSymbolIncludeList) && getData.keyToSymbolIncludeList.length > 0) {
            findCondition.keyToSymbol = { $in: getData.keyToSymbolIncludeList.map(keyToSymbol => keyToSymbol.toLowerCase()) };
        }
        if ((getData === null || getData === void 0 ? void 0 : getData.keyToSymbolExcludeList) && getData.keyToSymbolExcludeList.length > 0) {
            findCondition.keyToSymbol = { $nin: getData.keyToSymbolExcludeList.map(keyToSymbol => keyToSymbol.toLowerCase()) };
        }
        if (getData.stoneIds) {
            findCondition.stoneNo = { $in: getData.stoneIds.split(',') };
        }
        const totalCount = await diamonds_model_1.DiamondModel.countDocuments(findCondition);
        if (!totalCount) {
            return {
                diamonds: [],
                totalPages: 0,
                totalCount: 0,
            };
        }
        const limit = (getData === null || getData === void 0 ? void 0 : getData.limit) || config_1.PAGE_LIMIT;
        const skip = (getData === null || getData === void 0 ? void 0 : getData.skip) || 0;
        let sortObject = { pricePerCarat: 1, updatedAt: -1 };
        if (getData.sortOrder) {
            sortObject = Object.assign(Object.assign({}, sortObject), getData.sortOrder);
        }
        let findDiamonds = await diamonds_model_1.DiamondModel.find(findCondition).sort(sortObject).skip(skip).limit(limit);
        if (user) {
            const findDiamondIds = findDiamonds.map(diamond => diamond.uniqueStoneId);
            const notesList = await userDiamondNotes_model_1.UserDiamondNotesModel.find({ user: user._id, uniqueStoneId: { $in: findDiamondIds } });
            findDiamonds = findDiamonds.map(diamond => {
                var _a;
                const findNote = ((_a = notesList.find(data => data.uniqueStoneId === diamond.uniqueStoneId)) === null || _a === void 0 ? void 0 : _a.notes) || '';
                return Object.assign(Object.assign({}, (0, userFilters_1.filterDiamond)(diamond.toObject())), { userNotes: findNote });
            });
        }
        return {
            diamonds: findDiamonds,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
        };
    }
    async getDiamond(diamondId) {
        const findDiamond = await diamonds_model_1.DiamondModel.findOne({ isDeleted: false, _id: diamondId });
        if (!findDiamond) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.DIAMOND_NOT_FOUND);
        }
        return findDiamond;
    }
    async exportDiamondsToExcel(diamondIds) {
        const findDiamonds = await diamonds_model_1.DiamondModel.find({ _id: { $in: diamondIds }, isDeleted: false });
        if (!findDiamonds || findDiamonds.length === 0) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.SOLD_OUT_ERROR_REFRESH_PAGE);
        }
        const finalDiamondData = (0, helpers_1.formatDiamondToExcelData)(findDiamonds);
        const buffer = await (0, fileExport_1.getDiamondExcelBuffer)(finalDiamondData, `Stone Details ${(0, helpers_1.formatDate)(new Date())}`);
        return buffer;
    }
    async sendDiamondExcelMail(data) {
        const findDiamonds = await diamonds_model_1.DiamondModel.find({ _id: { $in: data.diamondIds }, isDeleted: false });
        if (!findDiamonds || findDiamonds.length === 0) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.SOLD_OUT_ERROR_REFRESH_PAGE);
        }
        const finalDiamondData = (0, helpers_1.formatDiamondToExcelData)(findDiamonds);
        const buffer = await (0, fileExport_1.getDiamondExcelBuffer)(finalDiamondData, `Stone Details ${(0, helpers_1.formatDate)(new Date())}`);
        (0, mailer_1.sendDiamondDataExcelMail)({ email: data.email, excelBuffer: buffer });
    }
    async getCertificate(diamondId) {
        const findDiamond = await diamonds_model_1.DiamondModel.findOne({ isDeleted: false, _id: diamondId });
        if (!findDiamond) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.DIAMOND_NOT_FOUND);
        }
        return { certificateLink: findDiamond.certificateLink };
    }
    async getVideo(diamondId) {
        const findDiamond = await diamonds_model_1.DiamondModel.findOne({ isDeleted: false, _id: diamondId });
        if (!findDiamond) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.DIAMOND_NOT_FOUND);
        }
        return { videoLink: findDiamond.videoLink };
    }
};
DiamondService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], DiamondService);
exports.DiamondService = DiamondService;
//# sourceMappingURL=diamond.service.js.map