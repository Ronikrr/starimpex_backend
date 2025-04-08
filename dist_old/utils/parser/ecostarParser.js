"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEcoStarData = void 0;
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const helpers_1 = require("../helpers");
const config_1 = require("../../config");
const regex_1 = require("../regex");
const rapPrice_model_1 = require("../../models/rapPrice.model");
const diamond_1 = require("../diamond");
const subTypeTerminology = {
    cvd: 'cvd',
    'cvd-as grown': 'cvd',
    hpht: 'hpht',
};
const florescenceTerminology = {
    none: 'none',
    sl: 'slight',
};
const getSubType = (type) => {
    return subTypeTerminology[type] ? subTypeTerminology[type] : type;
};
const getFlorescenceValue = (value) => {
    return florescenceTerminology[value] ? florescenceTerminology[value] : value || null;
};
const parseEcoStarData = async (data, sourceType, markupPercentage) => {
    if (!data || data.length === 0) {
        return;
    }
    const rapPriceList = await rapPrice_model_1.RapPriceModel.find().sort({ rapDate: -1, lowSize: -1, highSize: -1 });
    const IGI_CVD_CERTIFICATE_COMMENT = 'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
    const IGI_HPHT_CERTIFICATE_COMMENT = 'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';
    const parsedData = [];
    for (const obj of data) {
        const stoneNo = obj['Stock #'] ? obj['Stock #'] : null;
        if (stoneNo && String((obj === null || obj === void 0 ? void 0 : obj.Availability) || '').toLowerCase() === 'ga') {
            const netAmount = obj['Total $'] || 0;
            const weight = (obj === null || obj === void 0 ? void 0 : obj.Weight) || 0;
            const shape = (obj === null || obj === void 0 ? void 0 : obj.Shape) ? String(obj.Shape).toLowerCase().trim() : null;
            const color = (obj === null || obj === void 0 ? void 0 : obj.Color) && (obj === null || obj === void 0 ? void 0 : obj.Color) !== '*' ? String(obj.Color).toLowerCase().trim() : null;
            const clarity = (obj === null || obj === void 0 ? void 0 : obj.Clarity) ? String(obj.Clarity).toLowerCase() : null;
            const isRoundShape = diamond_1.mainShapes.round.includes(shape);
            const matchColor = color === 'o-p' ? 'm' : color;
            const rapPriceMatch = color
                ? rapPriceList.find(priceData => priceData.shape === (isRoundShape ? 'round' : 'pear') &&
                    priceData.clarity === clarity &&
                    priceData.color === matchColor &&
                    priceData.lowSize <= weight)
                : null;
            const rapRate = rapPriceMatch ? (0, helpers_1.roundFloatValues)(Number(rapPriceMatch === null || rapPriceMatch === void 0 ? void 0 : rapPriceMatch.price), 2) : null;
            const ourPrice = (0, helpers_1.calculateOurPrice)(netAmount, markupPercentage);
            const ourDiscount = rapRate || rapRate === 0 ? (0, helpers_1.calculateOurDiscount)(ourPrice, rapRate, weight) : null;
            const pricePerCarat = (0, helpers_1.calculatePricePerCarat)(ourPrice, weight);
            const shade = (obj === null || obj === void 0 ? void 0 : obj.Shade) ? String(obj.Shade).toLowerCase() : null;
            let certificateComment = '';
            const labType = (obj === null || obj === void 0 ? void 0 : obj.Lab) ? String(obj.Lab).toLowerCase().trim() : null;
            const type = obj['Stone Type'] ? getSubType(String(obj['Stone Type']).toLowerCase().trim()) : null;
            if (labType === 'igi' && type === diamonds_interface_1.ELabGrownType.CVD) {
                certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
            }
            if (labType === 'igi' && type === diamonds_interface_1.ELabGrownType.HPHT) {
                certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
            }
            const measurement = (obj === null || obj === void 0 ? void 0 : obj.Measurements) || '';
            const measures = measurement.match(regex_1.DIAMOND_MEASUREMENT_REGEX);
            const isMeasuresArrayNotEmpty = Array.isArray(measures) && (measures === null || measures === void 0 ? void 0 : measures.length) > 1;
            const length = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[1]) || 0) : null;
            const width = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[2]) || 0) : null;
            const height = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[3]) || 0) : null;
            const ratio = (0, helpers_1.calculateRatioByShape)(shape, width, length);
            const certificateLink = labType === 'igi' && obj['Certificate #']
                ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj['Certificate #']}`
                : obj['Certificate Link'] || null;
            parsedData.push({
                stoneNo: `${config_1.ECOSTAR_STONE_NUMBER_PREFIX}${stoneNo}`,
                source: sourceType,
                uniqueStoneId: `${sourceType}_${stoneNo}`,
                lab: labType === 'non-cert' ? 'none' : labType,
                inscription: labType === 'none' || !labType || labType === 'non-cert' ? 'no' : 'yes',
                shape: shape,
                caratWeight: weight,
                pricePerCarat: pricePerCarat,
                color: color,
                fancyColor: obj['Fancy Color'] ? String(obj['Fancy Color']).toLowerCase() : null,
                fancyIntensity: obj['Fancy Color Intensity'] ? String(obj['Fancy Color Intensity']).toLowerCase() : null,
                fancyOvertone: obj['Fancy Color Overtone'] ? String(obj['Fancy Color Overtone']).toLowerCase() : null,
                noBGM: String((obj === null || obj === void 0 ? void 0 : obj.BGM) || '').toLowerCase() === 'no' ? true : false,
                clarity: clarity,
                cut: (obj === null || obj === void 0 ? void 0 : obj.CutGrade) ? String(obj.CutGrade).toLowerCase() : null,
                polish: (obj === null || obj === void 0 ? void 0 : obj.Polish) ? String(obj.Polish).toLowerCase() : null,
                symmetry: (obj === null || obj === void 0 ? void 0 : obj.Symmetry) ? String(obj.Symmetry).toLowerCase() : null,
                florescence: obj['Fluorescence Intensity'] ? getFlorescenceValue(String(obj['Fluorescence Intensity']).toLowerCase().trim()) : null,
                type: type,
                country: (obj === null || obj === void 0 ? void 0 : obj.Country) ? String(obj.Country).toLowerCase() : null,
                state: (obj === null || obj === void 0 ? void 0 : obj.State) ? String(obj.State).toLowerCase() : null,
                city: (obj === null || obj === void 0 ? void 0 : obj.City) ? String(obj.City).toLowerCase() : null,
                shade: shade === 'wh' ? 'white' : shade,
                luster: null,
                eyeClean: null,
                milky: (obj === null || obj === void 0 ? void 0 : obj.Milky) ? String(obj.Milky).toLowerCase() : null,
                inclusion: null,
                extraFacet: null,
                internalGraining: null,
                surfaceGraining: null,
                heartsAndArrows: (obj === null || obj === void 0 ? void 0 : obj.HNA) ? String(obj.HNA).toLowerCase() !== 'no' : null,
                measurement: measurement,
                length: length,
                width: width,
                height: height,
                depthPercentage: obj['Depth %'] || obj['Depth %'] === 0 ? Number(obj['Depth %']) : 0,
                tablePercentage: obj['Table %'] || obj['Table %'] === 0 ? Number(obj['Table %']) : 0,
                crownAngle: obj['Crown Angle'] || obj['Crown Angle'] === 0 ? Number(obj['Crown Angle']) : 0,
                crownHeight: obj['Crowhn Height'] || obj['Crowhn Height'] === 0 ? Number(obj['Crowhn Height']) : 0,
                pavilionAngle: obj['Pavilion Angle'] || obj['Pavilion Angle'] === 0 ? Number(obj['Pavilion Angle']) : 0,
                pavilionHeight: obj['Pavilion Depth'] || obj['Pavilion Depth'] === 0 ? Number(obj['Pavilion Depth']) : 0,
                starLength: null,
                lowerHalves: null,
                girdleType: (obj === null || obj === void 0 ? void 0 : obj.GirdleThin) && (obj === null || obj === void 0 ? void 0 : obj.GirdleThick) ? `${obj.GirdleThin}, ${obj.GirdleThick}` : (obj === null || obj === void 0 ? void 0 : obj.GirdleThin) || (obj === null || obj === void 0 ? void 0 : obj.GirdleThick),
                girdlePercentage: obj['Girdle %'] || obj['Girdle %'] === 0 ? Number(obj['Girdle %']) : 0,
                culetSize: obj['Culet Size'] ? String(obj['Culet Size']).toLowerCase() : null,
                ratio: ratio,
                videoLink: obj['Diamond Video'] || null,
                imageLink: obj['Diamond Image'] || null,
                certificateLink: certificateLink,
                rap: rapRate,
                ourPrice: ourPrice,
                ourDiscount: ourDiscount,
                metadata: {
                    stoneNo: obj['Stock #'],
                    availability: obj === null || obj === void 0 ? void 0 : obj.Availability,
                    certificateNumber: obj['Certificate #'] || null,
                    girdleCondition: null,
                    treatment: obj === null || obj === void 0 ? void 0 : obj.TREATMENT,
                    actualRap: null,
                    actualDiscount: null,
                    actualPricePerCarat: obj['$/Ct'],
                    actualPrice: obj['Total $'],
                    memberComments: obj['Member Comments'],
                    diamondDetailsLink: obj['Diamond Details Link'],
                    laserInscription: obj['Laser Inscription'],
                },
                isDeleted: false,
                notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
                keyToSymbol: obj['Key To Symbols'] && obj['Key To Symbols'] !== '-' ? String(obj['Key To Symbols']).toLowerCase().split('  ') : null,
                certificateComment: certificateComment,
                diamondType: type && Object.values(diamonds_interface_1.ELabGrownType).includes(type) ? diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS : null,
                status: diamonds_interface_1.EDiamondStatus.AVAILABLE,
                motibaGemsComment: null,
            });
        }
    }
    return parsedData;
};
exports.parseEcoStarData = parseEcoStarData;
//# sourceMappingURL=ecostarParser.js.map