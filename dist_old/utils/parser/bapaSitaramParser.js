"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBapaSitaramData = void 0;
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const helpers_1 = require("../helpers");
const regex_1 = require("../regex");
const config_1 = require("../../config");
const shapeTerminology = {
    cu: 'cushion',
    em: 'emerald',
    ht: 'heart',
    mq: 'marquise',
    ov: 'oval',
    pe: 'pear',
    pr: 'princess',
    rad: 'radiant',
    rd: 'round',
    sqcus: 'square cushion',
    sqem: 'square emerald',
    sqrad: 'square radiant',
    eu: 'euro cut',
};
const cutTerminology = {
    ideal: 'id',
};
const florescenceTerminology = {
    none: 'none',
    sl: 'slight',
    vsl: 'very slight',
    stg: 'strong',
};
const getShapeValue = (shape) => {
    return shapeTerminology[shape] ? shapeTerminology[shape] : shape;
};
const getCutValue = (cut) => {
    return cutTerminology[cut] ? cutTerminology[cut] : cut;
};
const getFlorescenceValue = (value) => {
    return florescenceTerminology[value] ? florescenceTerminology[value] : value || null;
};
const parseBapaSitaramData = (data, sourceType, markupPercentage) => {
    if (!data || data.length === 0) {
        return;
    }
    const IGI_CVD_CERTIFICATE_COMMENT = 'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
    const IGI_HPHT_CERTIFICATE_COMMENT = 'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';
    const parsedData = [];
    for (const obj of data) {
        const stoneNo = (obj === null || obj === void 0 ? void 0 : obj.stock_num) ? obj.stock_num : null;
        const isAvailable = String((obj === null || obj === void 0 ? void 0 : obj.availability) || '').toLowerCase() === 'available';
        if (stoneNo && isAvailable) {
            const rapRate = (obj === null || obj === void 0 ? void 0 : obj.Rap_price) ? Number(obj.Rap_price) : 0;
            const weight = (obj === null || obj === void 0 ? void 0 : obj.size) ? Number(obj.size) : 0;
            const netAmount = (obj === null || obj === void 0 ? void 0 : obj.total_sales_price) ? Number(obj.total_sales_price) : 0;
            const ourPrice = (0, helpers_1.calculateOurPrice)(netAmount, markupPercentage);
            const ourDiscount = (0, helpers_1.calculateOurDiscount)(ourPrice, rapRate, weight);
            const pricePerCarat = (0, helpers_1.calculatePricePerCarat)(ourPrice, weight);
            const shade = (obj === null || obj === void 0 ? void 0 : obj.shade) ? String(obj.shade).toLowerCase() : null;
            const eyeClean = (obj === null || obj === void 0 ? void 0 : obj.eye_clean) ? (String(obj === null || obj === void 0 ? void 0 : obj.eye_clean).toLowerCase() === 'yes' ? 100 : 81) : null;
            const motibaGemsComment = eyeClean ? `${eyeClean}% eye clean with ${shade === 'white' || !shade ? 'no' : shade} tinge.` : null;
            let certificateComment = '';
            const labType = (obj === null || obj === void 0 ? void 0 : obj.lab) ? String(obj.lab).toLowerCase().trim() : null;
            const type = (obj === null || obj === void 0 ? void 0 : obj.DiamondType) ? String(obj.DiamondType).toLowerCase().trim() : null;
            if (labType === 'igi' && type === diamonds_interface_1.ELabGrownType.CVD) {
                certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
            }
            if (labType === 'igi' && type === diamonds_interface_1.ELabGrownType.HPHT) {
                certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
            }
            let diamondType = null;
            const labGrownTypes = Object.values(diamonds_interface_1.ELabGrownType);
            if (labGrownTypes.includes(type)) {
                diamondType = diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS;
            }
            if (type === 'natural') {
                diamondType = diamonds_interface_1.EDiamondType.NATURAL_DIAMONDS;
            }
            const city = (obj === null || obj === void 0 ? void 0 : obj.city) ? String(obj.city).toLowerCase() : null;
            const country = (obj === null || obj === void 0 ? void 0 : obj.country) ? String(obj.country).toLowerCase() : null;
            const state = (obj === null || obj === void 0 ? void 0 : obj.state) ? String(obj.state).toLowerCase() : null;
            const inclusion = [obj === null || obj === void 0 ? void 0 : obj.inclusion_black, obj === null || obj === void 0 ? void 0 : obj.inclusion_open, obj === null || obj === void 0 ? void 0 : obj.inclusion_center].filter(value => !(typeof value === 'undefined' || value === undefined || value === '' || value === null));
            const milky = (obj === null || obj === void 0 ? void 0 : obj.milky) ? String((obj === null || obj === void 0 ? void 0 : obj.milky) || '').toLowerCase() : null;
            const noBGM = (!milky || milky === 'none') && (!shade || shade === 'white') ? true : false;
            const measurement = (obj === null || obj === void 0 ? void 0 : obj.measurement) || '';
            const measures = measurement.match(regex_1.DIAMOND_MEASUREMENT_REGEX);
            const isMeasuresArrayNotEmpty = Array.isArray(measures) && (measures === null || measures === void 0 ? void 0 : measures.length) > 1;
            const length = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[1]) || 0) : null;
            const width = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[2]) || 0) : null;
            const height = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[3]) || 0) : null;
            const shape = (obj === null || obj === void 0 ? void 0 : obj.shape) ? getShapeValue(String(obj.shape).toLowerCase().trim()) : null;
            const ratio = (obj === null || obj === void 0 ? void 0 : obj.ratio) ? Number(obj.ratio) : (0, helpers_1.calculateRatioByShape)(shape, width, length);
            const certificateLink = labType === 'igi' && (obj === null || obj === void 0 ? void 0 : obj.cert_num) ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj.cert_num}` : (obj === null || obj === void 0 ? void 0 : obj.cert_url) || null;
            parsedData.push({
                stoneNo: `${config_1.BAPA_SITARAM_STONE_NUMBER_PREFIX}${stoneNo}`,
                source: sourceType,
                uniqueStoneId: `${sourceType}_${stoneNo}`,
                lab: labType,
                inscription: labType === 'none' || !labType ? 'no' : 'yes',
                shape: shape,
                caratWeight: weight,
                pricePerCarat: pricePerCarat,
                color: (obj === null || obj === void 0 ? void 0 : obj.color) ? String(obj.color).toLowerCase() : null,
                fancyColor: (obj === null || obj === void 0 ? void 0 : obj.fancy_color) ? String(obj.fancy_color).toLowerCase() : null,
                fancyIntensity: (obj === null || obj === void 0 ? void 0 : obj.fancy_color_intensity) ? String(obj.fancy_color_intensity).toLowerCase().trim() : null,
                fancyOvertone: (obj === null || obj === void 0 ? void 0 : obj.fancy_color_overtone) ? String(obj.fancy_color_overtone).toLowerCase() : null,
                noBGM: noBGM,
                clarity: (obj === null || obj === void 0 ? void 0 : obj.clarity) ? String(obj.clarity).toLowerCase() : null,
                cut: (obj === null || obj === void 0 ? void 0 : obj.cut) ? getCutValue(String(obj.cut).toLowerCase().trim()) : null,
                polish: (obj === null || obj === void 0 ? void 0 : obj.polish) ? String(obj.polish).toLowerCase() : null,
                symmetry: (obj === null || obj === void 0 ? void 0 : obj.symmetry) ? String(obj.symmetry).toLowerCase() : null,
                florescence: (obj === null || obj === void 0 ? void 0 : obj.fluor_intensity) ? getFlorescenceValue(String(obj.fluor_intensity).toLowerCase().trim()) : null,
                type: type,
                country: country,
                city: city,
                state: state,
                shade: shade,
                luster: null,
                eyeClean: eyeClean,
                milky: milky,
                inclusion: inclusion ? inclusion.join(',') : null,
                extraFacet: null,
                internalGraining: null,
                surfaceGraining: null,
                heartsAndArrows: null,
                measurement: measurement,
                length: length,
                width: width,
                height: height,
                depthPercentage: (obj === null || obj === void 0 ? void 0 : obj.depth_percent) || (obj === null || obj === void 0 ? void 0 : obj.depth_percent) === 0 ? Number(obj.depth_percent) : null,
                tablePercentage: (obj === null || obj === void 0 ? void 0 : obj.table_percent) || (obj === null || obj === void 0 ? void 0 : obj.table_percent) === 0 ? Number(obj.table_percent) : null,
                crownAngle: (obj === null || obj === void 0 ? void 0 : obj.crown_angle) || (obj === null || obj === void 0 ? void 0 : obj.crown_angle) === 0 ? Number(obj.crown_angle) : null,
                crownHeight: (obj === null || obj === void 0 ? void 0 : obj.crown_height) || (obj === null || obj === void 0 ? void 0 : obj.crown_height) === 0 ? Number(obj.crown_height) : null,
                pavilionAngle: (obj === null || obj === void 0 ? void 0 : obj.pavilion_angle) || (obj === null || obj === void 0 ? void 0 : obj.pavilion_angle) === 0 ? Number(obj.pavilion_angle) : null,
                pavilionHeight: (obj === null || obj === void 0 ? void 0 : obj.pavilion_depth) || (obj === null || obj === void 0 ? void 0 : obj.pavilion_depth) === 0 ? Number(obj.pavilion_depth) : null,
                starLength: (obj === null || obj === void 0 ? void 0 : obj.star_length) || null,
                lowerHalves: null,
                girdleType: (obj === null || obj === void 0 ? void 0 : obj.girdle_min) && (obj === null || obj === void 0 ? void 0 : obj.girdle_max) ? `${obj.girdle_min}, ${obj.girdle_max}` : (obj === null || obj === void 0 ? void 0 : obj.girdle_min) || (obj === null || obj === void 0 ? void 0 : obj.girdle_max),
                girdlePercentage: (obj === null || obj === void 0 ? void 0 : obj.girdle_percent) || (obj === null || obj === void 0 ? void 0 : obj.girdle_percent) === 0 ? Number(obj.girdle_percent) : null,
                culetSize: (obj === null || obj === void 0 ? void 0 : obj.culet_size) ? String(obj === null || obj === void 0 ? void 0 : obj.culet_size).toLowerCase() : null,
                ratio: ratio,
                videoLink: (obj === null || obj === void 0 ? void 0 : obj.video_url) || null,
                imageLink: (obj === null || obj === void 0 ? void 0 : obj.image_url) || null,
                certificateLink: certificateLink,
                rap: rapRate,
                ourPrice: ourPrice,
                ourDiscount: ourDiscount,
                metadata: {
                    girdleCondition: obj === null || obj === void 0 ? void 0 : obj.girdle_condition,
                    stoneNo: obj === null || obj === void 0 ? void 0 : obj.stock_num,
                    availability: obj === null || obj === void 0 ? void 0 : obj.availability,
                    certificateNumber: obj === null || obj === void 0 ? void 0 : obj.cert_num,
                    actualRap: (obj === null || obj === void 0 ? void 0 : obj.Rap_price) || (obj === null || obj === void 0 ? void 0 : obj.Rap_price) === 0 ? Number(obj === null || obj === void 0 ? void 0 : obj.Rap_price) : null,
                    actualDiscount: (obj === null || obj === void 0 ? void 0 : obj.discount_percent) || (obj === null || obj === void 0 ? void 0 : obj.discount_percent) === 0 ? Number(obj === null || obj === void 0 ? void 0 : obj.discount_percent) : null,
                    actualPricePerCarat: (obj === null || obj === void 0 ? void 0 : obj.price_per_cara) ? Number(obj === null || obj === void 0 ? void 0 : obj.price_per_cara) : null,
                    actualPrice: (obj === null || obj === void 0 ? void 0 : obj.total_sales_price) || (obj === null || obj === void 0 ? void 0 : obj.total_sales_price) === 0 ? Number(obj === null || obj === void 0 ? void 0 : obj.total_sales_price) : null,
                    comments: obj === null || obj === void 0 ? void 0 : obj.comments,
                    certificateComment: obj === null || obj === void 0 ? void 0 : obj.cert_comment,
                    culetCondition: obj === null || obj === void 0 ? void 0 : obj.culet_condition,
                    inclusionCenter: obj === null || obj === void 0 ? void 0 : obj.inclusion_center,
                    setMatchedPairSeparable: obj === null || obj === void 0 ? void 0 : obj.set_matched_pair_separable,
                    treatment: obj === null || obj === void 0 ? void 0 : obj.treatment,
                    tradeShow: obj === null || obj === void 0 ? void 0 : obj.trade_show,
                    laserInscription: obj === null || obj === void 0 ? void 0 : obj.laser_inscription,
                    cameraRef: obj === null || obj === void 0 ? void 0 : obj.camera_ref,
                    cashDiscount: obj === null || obj === void 0 ? void 0 : obj.cash_discount,
                    cashPrice: obj === null || obj === void 0 ? void 0 : obj.cash_price,
                    pairStockNumber: obj === null || obj === void 0 ? void 0 : obj.pair_stock_num,
                    parcelStones: obj === null || obj === void 0 ? void 0 : obj.parcel_stones,
                    inclusionBlack: obj === null || obj === void 0 ? void 0 : obj.inclusion_black,
                    inclusionOpen: obj === null || obj === void 0 ? void 0 : obj.inclusion_open,
                    cameraType: obj === null || obj === void 0 ? void 0 : obj.camera_type,
                    fancyOrderSecondaryColor: obj === null || obj === void 0 ? void 0 : obj.fancy_color_secondary_color,
                    printOrderNo: obj === null || obj === void 0 ? void 0 : obj.PrintOrderNo,
                    diamondDate: obj === null || obj === void 0 ? void 0 : obj.DiamondDate,
                },
                isDeleted: false,
                notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
                keyToSymbol: (obj === null || obj === void 0 ? void 0 : obj.KeyToSymbole) ? String(obj.KeyToSymbole).toLowerCase().split('  ') : null,
                certificateComment: certificateComment,
                diamondType: diamondType,
                status: diamonds_interface_1.EDiamondStatus.AVAILABLE,
                motibaGemsComment: motibaGemsComment,
            });
        }
    }
    return parsedData;
};
exports.parseBapaSitaramData = parseBapaSitaramData;
//# sourceMappingURL=bapaSitaramParser.js.map