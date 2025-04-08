"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAnjaliData = void 0;
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const helpers_1 = require("../helpers");
const config_1 = require("../../config");
const regex_1 = require("../regex");
const florescenceTerminology = {
    none: 'none',
    slt: 'slight',
    vsl: 'very slight',
};
const getFlorescenceValue = (value) => {
    return florescenceTerminology[value] ? florescenceTerminology[value] : value || null;
};
const parseAnjaliData = (data, sourceType, markupPercentage) => {
    if (!data || data.length === 0) {
        return;
    }
    const IGI_CVD_CERTIFICATE_COMMENT = 'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
    const IGI_HPHT_CERTIFICATE_COMMENT = 'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';
    const parsedData = [];
    for (const obj of data) {
        const stoneNo = (obj === null || obj === void 0 ? void 0 : obj.Stone_NO) ? obj.Stone_NO : null;
        const isAvailable = String((obj === null || obj === void 0 ? void 0 : obj.StockStatus) || '').toLowerCase() === 'available';
        if (stoneNo && isAvailable) {
            const isNotFancyColor = !(obj === null || obj === void 0 ? void 0 : obj.FColor);
            const netAmount = (obj === null || obj === void 0 ? void 0 : obj.SaleAmt) || 0;
            const liveRap = (obj === null || obj === void 0 ? void 0 : obj.LiveRAP) || 0;
            const weight = (obj === null || obj === void 0 ? void 0 : obj.Weight) || 0;
            const rapRate = isNotFancyColor ? liveRap : weight !== 0 ? netAmount / weight : 0;
            const ourPrice = (0, helpers_1.calculateOurPrice)(netAmount, markupPercentage);
            const ourDiscount = isNotFancyColor ? (0, helpers_1.calculateOurDiscount)(ourPrice, rapRate, weight) : 0;
            const pricePerCarat = (0, helpers_1.calculatePricePerCarat)(ourPrice, weight);
            const shade = (obj === null || obj === void 0 ? void 0 : obj.Tinge) ? String(obj.Tinge).toLowerCase() : null;
            const eyeClean = (obj === null || obj === void 0 ? void 0 : obj.Eyeclean) ? ((obj === null || obj === void 0 ? void 0 : obj.Eyeclean) === 'Y' ? 100 : 81) : null;
            const motibaGemsComment = eyeClean ? `${eyeClean}% eye clean with ${shade === 'white' || !shade ? 'no' : shade} tinge.` : null;
            let certificateComment = '';
            const labType = (obj === null || obj === void 0 ? void 0 : obj.Lab) ? String(obj.Lab).toLowerCase().trim() : null;
            let type = null;
            if (obj === null || obj === void 0 ? void 0 : obj.CVD_HPHT) {
                type = String(obj.CVD_HPHT).toLowerCase();
            }
            if (obj === null || obj === void 0 ? void 0 : obj.Natural_Type) {
                type = String(obj.Natural_Type).toLowerCase();
            }
            if (labType === 'igi' && type === diamonds_interface_1.ELabGrownType.CVD) {
                certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
            }
            if (labType === 'igi' && type === diamonds_interface_1.ELabGrownType.HPHT) {
                certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
            }
            const city = (obj === null || obj === void 0 ? void 0 : obj.Location) ? String(obj.Location).toLowerCase() : null;
            const country = city === 'surat' || city === 'mumbai' ? 'india' : null;
            const inclusion = [obj === null || obj === void 0 ? void 0 : obj.Table_Inclusion, obj === null || obj === void 0 ? void 0 : obj.Black_Inclusion, obj === null || obj === void 0 ? void 0 : obj.Side_Inclusion, obj === null || obj === void 0 ? void 0 : obj.Open_Inclusion, obj === null || obj === void 0 ? void 0 : obj.Feather_Inclusion].filter(value => !(typeof value === 'undefined' || value === undefined || value === '' || value === null));
            const milky = (obj === null || obj === void 0 ? void 0 : obj.Milkey) ? String((obj === null || obj === void 0 ? void 0 : obj.Milkey) || '').toLowerCase() : null;
            const noBGM = (!milky || milky === 'none') && (!shade || shade === 'white') ? true : false;
            const measurement = (obj === null || obj === void 0 ? void 0 : obj.Measurement) || '';
            const measures = measurement.match(regex_1.DIAMOND_MEASUREMENT_REGEX);
            const isMeasuresArrayNotEmpty = Array.isArray(measures) && (measures === null || measures === void 0 ? void 0 : measures.length) > 1;
            const length = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[1]) || 0) : null;
            const width = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[2]) || 0) : null;
            const height = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[3]) || 0) : null;
            const shape = (obj === null || obj === void 0 ? void 0 : obj.Shape) ? String(obj.Shape).toLowerCase() : null;
            const ratio = (obj === null || obj === void 0 ? void 0 : obj.Ratio) || (obj === null || obj === void 0 ? void 0 : obj.Ratio) === 0 ? Number(obj.Ratio) : (0, helpers_1.calculateRatioByShape)(shape, width, length);
            const certificateLink = labType === 'igi' && (obj === null || obj === void 0 ? void 0 : obj.Lab_Report_No) ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj.Lab_Report_No}` : (obj === null || obj === void 0 ? void 0 : obj.LabLink) || null;
            parsedData.push({
                stoneNo: `${config_1.ANJALI_STONE_NUMBER_PREFIX}${stoneNo}`,
                source: sourceType,
                uniqueStoneId: `${sourceType}_${stoneNo}`,
                lab: labType,
                inscription: labType === 'none' || !labType ? 'no' : 'yes',
                shape: shape,
                caratWeight: (obj === null || obj === void 0 ? void 0 : obj.Weight) || (obj === null || obj === void 0 ? void 0 : obj.Weight) === 0 ? Number(obj.Weight) : null,
                pricePerCarat: pricePerCarat,
                color: (obj === null || obj === void 0 ? void 0 : obj.Color) ? String(obj.Color).toLowerCase() : null,
                fancyColor: (obj === null || obj === void 0 ? void 0 : obj.FColor) ? String(obj.FColor).toLowerCase() : null,
                fancyIntensity: (obj === null || obj === void 0 ? void 0 : obj.FCIntens) ? String(obj.FCIntens).toLowerCase() : null,
                fancyOvertone: (obj === null || obj === void 0 ? void 0 : obj.FCOverton) ? String(obj.FCOverton).toLowerCase() : null,
                noBGM: noBGM,
                clarity: (obj === null || obj === void 0 ? void 0 : obj.Clarity) ? String(obj.Clarity).toLowerCase() : null,
                cut: (obj === null || obj === void 0 ? void 0 : obj.Cut) ? String(obj.Cut).toLowerCase() : null,
                polish: (obj === null || obj === void 0 ? void 0 : obj.Polish) ? String(obj.Polish).toLowerCase() : null,
                symmetry: (obj === null || obj === void 0 ? void 0 : obj.Symm) ? String(obj.Symm).toLowerCase() : null,
                florescence: (obj === null || obj === void 0 ? void 0 : obj.FlrIntens) ? getFlorescenceValue(String(obj.FlrIntens).toLowerCase().trim()) : null,
                type: type,
                country: country,
                city: city,
                shade: shade,
                luster: (obj === null || obj === void 0 ? void 0 : obj.Luster) ? String(obj.Luster).toLowerCase() : null,
                eyeClean: eyeClean,
                milky: milky,
                inclusion: inclusion.join(','),
                extraFacet: (obj === null || obj === void 0 ? void 0 : obj.ExtraFacet) ? String(obj.ExtraFacet).toLowerCase() : null,
                internalGraining: (obj === null || obj === void 0 ? void 0 : obj.Internal_Graining) ? String(obj.Internal_Graining).toLowerCase() : null,
                surfaceGraining: (obj === null || obj === void 0 ? void 0 : obj.Surface_Graining) ? String(obj === null || obj === void 0 ? void 0 : obj.Surface_Graining).toLowerCase() : null,
                heartsAndArrows: (obj === null || obj === void 0 ? void 0 : obj.HnA) ? String(obj.HnA).toLowerCase() === 'yes' : null,
                measurement: (obj === null || obj === void 0 ? void 0 : obj.Measurement) || null,
                length: length,
                width: width,
                height: height,
                depthPercentage: (obj === null || obj === void 0 ? void 0 : obj.Total_Depth_Per) || (obj === null || obj === void 0 ? void 0 : obj.Total_Depth_Per) === 0 ? Number(obj.Total_Depth_Per) : null,
                tablePercentage: (obj === null || obj === void 0 ? void 0 : obj.Table_Diameter_Per) || (obj === null || obj === void 0 ? void 0 : obj.Table_Diameter_Per) === 0 ? Number(obj.Table_Diameter_Per) : null,
                crownAngle: (obj === null || obj === void 0 ? void 0 : obj.CrownAngle) || (obj === null || obj === void 0 ? void 0 : obj.CrownAngle) === 0 ? Number(obj.CrownAngle) : null,
                crownHeight: (obj === null || obj === void 0 ? void 0 : obj.CrownHeight) || (obj === null || obj === void 0 ? void 0 : obj.CrownHeight) === 0 ? Number(obj.CrownHeight) : null,
                pavilionAngle: (obj === null || obj === void 0 ? void 0 : obj.PavillionAngle) || (obj === null || obj === void 0 ? void 0 : obj.PavillionAngle) === 0 ? Number(obj.PavillionAngle) : null,
                pavilionHeight: (obj === null || obj === void 0 ? void 0 : obj.PavillionHeight) || (obj === null || obj === void 0 ? void 0 : obj.PavillionHeight) === 0 ? Number(obj.PavillionHeight) : null,
                starLength: (obj === null || obj === void 0 ? void 0 : obj.StarLength) || null,
                lowerHalves: (obj === null || obj === void 0 ? void 0 : obj.LowerHalve) || null,
                girdleType: (obj === null || obj === void 0 ? void 0 : obj.GirdleThin_ID) && (obj === null || obj === void 0 ? void 0 : obj.GirdleThick_ID) ? `${obj.GirdleThin_ID}, ${obj.GirdleThick_ID}` : (obj === null || obj === void 0 ? void 0 : obj.GirdleThin_ID) || (obj === null || obj === void 0 ? void 0 : obj.GirdleThick_ID),
                girdlePercentage: (obj === null || obj === void 0 ? void 0 : obj.Girdle_Per) || (obj === null || obj === void 0 ? void 0 : obj.Girdle_Per) === 0 ? Number(obj.Girdle_Per) : null,
                culetSize: (obj === null || obj === void 0 ? void 0 : obj.CuletSize) ? String(obj === null || obj === void 0 ? void 0 : obj.CuletSize).toLowerCase() : null,
                ratio: ratio,
                videoLink: (obj === null || obj === void 0 ? void 0 : obj.Video_url) || null,
                imageLink: (obj === null || obj === void 0 ? void 0 : obj.Stone_Img_url) || null,
                certificateLink: certificateLink,
                rap: rapRate,
                ourPrice: ourPrice,
                ourDiscount: ourDiscount,
                metadata: {
                    fluoColor: obj === null || obj === void 0 ? void 0 : obj.FlrColor,
                    fancyColor: obj === null || obj === void 0 ? void 0 : obj.FColor,
                    fancyColorIntensity: obj === null || obj === void 0 ? void 0 : obj.FCIntens,
                    fancyColorOverTone: obj === null || obj === void 0 ? void 0 : obj.FCOverton,
                    status: obj === null || obj === void 0 ? void 0 : obj.StockStatus,
                    girdleName: obj === null || obj === void 0 ? void 0 : obj.GirdleName,
                    girdleCondition: obj === null || obj === void 0 ? void 0 : obj.GirdleCon,
                    stoneNo: stoneNo,
                    florescenceIntensity: obj === null || obj === void 0 ? void 0 : obj.FlrIntens,
                    minimumDiameter: obj === null || obj === void 0 ? void 0 : obj.Diameter_Min,
                    maximumDiameter: obj === null || obj === void 0 ? void 0 : obj.Diameter_Max,
                    totalDepth: obj === null || obj === void 0 ? void 0 : obj.Total_Depth,
                    labLocation: obj === null || obj === void 0 ? void 0 : obj.LabLocation,
                    labReportNo: obj === null || obj === void 0 ? void 0 : obj.Lab_Report_No,
                    labLink: obj === null || obj === void 0 ? void 0 : obj.LabLink,
                    labReportDate: obj === null || obj === void 0 ? void 0 : obj.Lab_Report_Date,
                    laserInscription: obj === null || obj === void 0 ? void 0 : obj.Laser_Inscription,
                    treatment: obj === null || obj === void 0 ? void 0 : obj.Treatment,
                    culetCondition: obj === null || obj === void 0 ? void 0 : obj.CuletCon,
                    pairStockNo: obj === null || obj === void 0 ? void 0 : obj.PairStock_No,
                    parcelsStone: obj === null || obj === void 0 ? void 0 : obj.Parcels_Stone,
                    comment: obj === null || obj === void 0 ? void 0 : obj.Comment,
                    tableInclusion: obj === null || obj === void 0 ? void 0 : obj.Table_Inclusion,
                    blackInclusion: obj === null || obj === void 0 ? void 0 : obj.Black_Inclusion,
                    sideInclusion: obj === null || obj === void 0 ? void 0 : obj.Side_Inclusion,
                    openInclusion: obj === null || obj === void 0 ? void 0 : obj.Open_Inclusion,
                    brand: obj === null || obj === void 0 ? void 0 : obj.Brand,
                    tinge: obj === null || obj === void 0 ? void 0 : obj.Tinge,
                    featherInclusion: obj === null || obj === void 0 ? void 0 : obj.Feather_Inclusion,
                    fancyColorDescription: obj === null || obj === void 0 ? void 0 : obj.Fancy_Color_Description,
                    stoneComment: obj === null || obj === void 0 ? void 0 : obj.NewArrival,
                    isVideoExists: obj === null || obj === void 0 ? void 0 : obj.Is_VedioExist,
                    isImageExists: obj === null || obj === void 0 ? void 0 : obj.Is_imgExist,
                    isCertificateExists: obj === null || obj === void 0 ? void 0 : obj.Is_CertyExist,
                    labReportComment: obj === null || obj === void 0 ? void 0 : obj.Lab_Report_Comment,
                    remarks: obj === null || obj === void 0 ? void 0 : obj.Remarks,
                    controlNo: obj === null || obj === void 0 ? void 0 : obj.Control_No,
                    actualRap: obj === null || obj === void 0 ? void 0 : obj.LiveRAP,
                    actualDiscount: obj === null || obj === void 0 ? void 0 : obj.SaleDis,
                    actualPricePerCarat: (obj === null || obj === void 0 ? void 0 : obj.Weight) ? (0, helpers_1.calculatePricePerCarat)(obj.SaleAmt, obj.Weight) : 0,
                    actualPrice: obj === null || obj === void 0 ? void 0 : obj.SaleAmt,
                    salesRate: obj === null || obj === void 0 ? void 0 : obj.SaleRate,
                    BIS: obj === null || obj === void 0 ? void 0 : obj.BIS,
                    BIC: obj === null || obj === void 0 ? void 0 : obj.BIC,
                    WIS: obj === null || obj === void 0 ? void 0 : obj.WIS,
                    WIC: obj === null || obj === void 0 ? void 0 : obj.WIC,
                    ratio: obj === null || obj === void 0 ? void 0 : obj.Ratio,
                },
                isDeleted: false,
                notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
                keyToSymbol: (obj === null || obj === void 0 ? void 0 : obj.KeyToSymbols) ? String(obj.KeyToSymbols).toLowerCase() : null,
                certificateComment: certificateComment,
                diamondType: String(obj.Diamond_Type || '').toLowerCase() === 'labgrown' ? diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS : null,
                status: diamonds_interface_1.EDiamondStatus.AVAILABLE,
                motibaGemsComment: motibaGemsComment,
            });
        }
    }
    return parsedData;
};
exports.parseAnjaliData = parseAnjaliData;
//# sourceMappingURL=anjaliParser.js.map