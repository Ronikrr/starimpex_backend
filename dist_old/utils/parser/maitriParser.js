"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMaitriData = void 0;
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const helpers_1 = require("../helpers");
const config_1 = require("../../config");
const regex_1 = require("../regex");
const parseMaitriData = (data, sourceType, markupPercentage) => {
    if (!data) {
        return;
    }
    const IGI_CVD_CERTIFICATE_COMMENT = 'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
    const IGI_HPHT_CERTIFICATE_COMMENT = 'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';
    const parsedData = [];
    for (const obj of data) {
        const stoneNo = (obj === null || obj === void 0 ? void 0 : obj.Code) ? obj.Code : null;
        if (stoneNo) {
            const rapRate = (obj === null || obj === void 0 ? void 0 : obj.RapRate) || 0;
            const weight = (obj === null || obj === void 0 ? void 0 : obj.Weight) || 0;
            const netAmount = (obj === null || obj === void 0 ? void 0 : obj.NetAmount) || 0;
            const ourPrice = (0, helpers_1.calculateOurPrice)(netAmount, markupPercentage);
            const ourDiscount = (0, helpers_1.calculateOurDiscount)(ourPrice, rapRate, weight);
            const pricePerCarat = (0, helpers_1.calculatePricePerCarat)(ourPrice, weight);
            const motibaGemsComment = (obj === null || obj === void 0 ? void 0 : obj.Shade) && (obj === null || obj === void 0 ? void 0 : obj.EC)
                ? `${obj === null || obj === void 0 ? void 0 : obj.EC} eye clean with ${((obj === null || obj === void 0 ? void 0 : obj.Shade) || '').toLowerCase() === 'white' || !(obj === null || obj === void 0 ? void 0 : obj.Shade) ? 'no' : obj === null || obj === void 0 ? void 0 : obj.Shade} tinge.`
                : null;
            let certificateComment = '';
            if ((obj === null || obj === void 0 ? void 0 : obj.Lab) === 'IGI' && (obj === null || obj === void 0 ? void 0 : obj.Type) === diamonds_interface_1.ELabGrownType.CVD) {
                certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
            }
            if ((obj === null || obj === void 0 ? void 0 : obj.Lab) === 'IGI' && (obj === null || obj === void 0 ? void 0 : obj.Type) === diamonds_interface_1.ELabGrownType.HPHT) {
                certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
            }
            const shape = (obj === null || obj === void 0 ? void 0 : obj.Shape) ? obj.Shape.toLowerCase() : null;
            let width = (obj === null || obj === void 0 ? void 0 : obj.Width) || (obj === null || obj === void 0 ? void 0 : obj.Width) === 0 ? Number(obj.Width) : null;
            let length = (obj === null || obj === void 0 ? void 0 : obj.Length) || (obj === null || obj === void 0 ? void 0 : obj.Length) === 0 ? Number(obj.Length) : null;
            let height = (obj === null || obj === void 0 ? void 0 : obj.Height) || (obj === null || obj === void 0 ? void 0 : obj.Height) === 0 ? Number(obj.Height) : null;
            const measurement = (obj === null || obj === void 0 ? void 0 : obj.Measurements) || '';
            if ((!width || !height || !length) && measurement) {
                const measures = measurement.match(regex_1.DIAMOND_MEASUREMENT_REGEX);
                const isMeasuresArrayNotEmpty = Array.isArray(measures) && (measures === null || measures === void 0 ? void 0 : measures.length) > 1;
                if (!length && length !== 0) {
                    length = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[1]) || 0) : null;
                }
                if (!width && width !== 0) {
                    width = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[2]) || 0) : null;
                }
                if (!height && height !== 0) {
                    height = isMeasuresArrayNotEmpty ? Number((measures === null || measures === void 0 ? void 0 : measures[3]) || 0) : null;
                }
            }
            const ratio = (obj === null || obj === void 0 ? void 0 : obj.LengthByWidthRatio) ? obj.LengthByWidthRatio : (0, helpers_1.calculateRatioByShape)(shape, width, length);
            const labType = String((obj === null || obj === void 0 ? void 0 : obj.Lab) || '').toLowerCase();
            const certificateLink = labType === 'igi' && (obj === null || obj === void 0 ? void 0 : obj.CertificateNumber)
                ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj.CertificateNumber}`
                : (obj === null || obj === void 0 ? void 0 : obj.CertificateLink) || null;
            parsedData.push({
                stoneNo: stoneNo ? `${config_1.MAITRI_STONE_NUMBER_PREFIX}${stoneNo}` : null,
                source: sourceType,
                uniqueStoneId: stoneNo ? `${sourceType}_${stoneNo}` : null,
                lab: labType || null,
                inscription: !labType || labType === 'none' ? 'no' : 'yes',
                shape: shape,
                caratWeight: obj === null || obj === void 0 ? void 0 : obj.Weight,
                pricePerCarat: pricePerCarat,
                color: (obj === null || obj === void 0 ? void 0 : obj.Color) ? obj.Color.toLowerCase() : null,
                fancyColor: (obj === null || obj === void 0 ? void 0 : obj.FancyColor) ? obj.FancyColor.toLowerCase() : null,
                fancyIntensity: (obj === null || obj === void 0 ? void 0 : obj.FancyColor) ? obj.FancyColor.toLowerCase() : null,
                fancyOvertone: (obj === null || obj === void 0 ? void 0 : obj.FancyColorOverTone) ? obj.FancyColorOverTone.toLowerCase() : null,
                noBGM: obj === null || obj === void 0 ? void 0 : obj.NoBGM,
                clarity: (obj === null || obj === void 0 ? void 0 : obj.Clarity) ? obj.Clarity.toLowerCase() : null,
                cut: (obj === null || obj === void 0 ? void 0 : obj.Cut) ? obj.Cut.toLowerCase() : null,
                polish: (obj === null || obj === void 0 ? void 0 : obj.Polish) ? obj.Polish.toLowerCase() : null,
                symmetry: (obj === null || obj === void 0 ? void 0 : obj.Symm) ? obj.Symm.toLowerCase() : null,
                florescence: (obj === null || obj === void 0 ? void 0 : obj.Fluo) ? obj.Fluo.toLowerCase() : null,
                type: (obj === null || obj === void 0 ? void 0 : obj.Type) ? obj.Type.toLowerCase() : null,
                country: (obj === null || obj === void 0 ? void 0 : obj.BranchCountry) ? obj.BranchCountry.toLowerCase() : null,
                city: (obj === null || obj === void 0 ? void 0 : obj.Branch) ? obj.Branch.toLowerCase() : null,
                shade: (obj === null || obj === void 0 ? void 0 : obj.Shade) ? obj.Shade.toLowerCase() : null,
                luster: null,
                eyeClean: (obj === null || obj === void 0 ? void 0 : obj.EC) ? Number(obj.EC.replace('%', '')) : null,
                milky: null,
                inclusion: null,
                extraFacet: null,
                internalGraining: null,
                surfaceGraining: null,
                heartsAndArrows: obj === null || obj === void 0 ? void 0 : obj.HeartsAndArrows,
                measurement: measurement,
                length: length,
                width: width,
                height: height,
                depthPercentage: (obj === null || obj === void 0 ? void 0 : obj.DepthPercent) || (obj === null || obj === void 0 ? void 0 : obj.DepthPercent) === 0 ? Number(obj.DepthPercent) : null,
                tablePercentage: (obj === null || obj === void 0 ? void 0 : obj.TablePercent) || (obj === null || obj === void 0 ? void 0 : obj.TablePercent) === 0 ? Number(obj.TablePercent) : null,
                crownAngle: (obj === null || obj === void 0 ? void 0 : obj.CrownAngle) || (obj === null || obj === void 0 ? void 0 : obj.CrownAngle) === 0 ? Number(obj.CrownAngle) : null,
                crownHeight: (obj === null || obj === void 0 ? void 0 : obj.CrownHeight) || (obj === null || obj === void 0 ? void 0 : obj.CrownHeight) === 0 ? Number(obj.CrownHeight) : null,
                pavilionAngle: (obj === null || obj === void 0 ? void 0 : obj.PavilionAngle) || (obj === null || obj === void 0 ? void 0 : obj.PavilionAngle) === 0 ? Number(obj.PavilionAngle) : null,
                pavilionHeight: (obj === null || obj === void 0 ? void 0 : obj.PavilionDepth) || (obj === null || obj === void 0 ? void 0 : obj.PavilionDepth) === 0 ? Number(obj.PavilionDepth) : null,
                starLength: null,
                lowerHalves: null,
                girdleType: (obj === null || obj === void 0 ? void 0 : obj.GirdleThin) && (obj === null || obj === void 0 ? void 0 : obj.GirdleThick) ? `${obj.GirdleThin}, ${obj.GirdleThick}` : (obj === null || obj === void 0 ? void 0 : obj.GirdleThin) || (obj === null || obj === void 0 ? void 0 : obj.GirdleThick),
                girdlePercentage: (obj === null || obj === void 0 ? void 0 : obj.GirdlePercent) || (obj === null || obj === void 0 ? void 0 : obj.GirdlePercent) === 0 ? Number(obj.GirdlePercent) : null,
                culetSize: (obj === null || obj === void 0 ? void 0 : obj.CuletSize) ? obj.CuletSize.toLowerCase() : null,
                ratio: ratio,
                videoLink: (obj === null || obj === void 0 ? void 0 : obj.AmazonVideoLink) || null,
                imageLink: (obj === null || obj === void 0 ? void 0 : obj.AWSDiamondImageLink) || null,
                certificateLink: certificateLink,
                rap: rapRate,
                ourPrice: ourPrice,
                ourDiscount: ourDiscount,
                metadata: {
                    newBarcode: obj === null || obj === void 0 ? void 0 : obj.NewBarcode,
                    mixBarcode: obj === null || obj === void 0 ? void 0 : obj.MixBarcode,
                    fluoColor: obj === null || obj === void 0 ? void 0 : obj.FluoColor,
                    fancyColor: obj === null || obj === void 0 ? void 0 : obj.FancyColor,
                    fancyColorShortName: obj === null || obj === void 0 ? void 0 : obj.FancyColorShortName,
                    fancyColorIntensity: obj === null || obj === void 0 ? void 0 : obj.FancyColorIntensity,
                    fancyColorIntensityShortName: obj === null || obj === void 0 ? void 0 : obj.FancyColorIntensityShortName,
                    fancyColorOverTone: obj === null || obj === void 0 ? void 0 : obj.FancyColorOverTone,
                    fancyColorOverToneShortName: obj === null || obj === void 0 ? void 0 : obj.FancyColorOverToneShortName,
                    overTone: obj === null || obj === void 0 ? void 0 : obj.OverTone,
                    tone: obj === null || obj === void 0 ? void 0 : obj.Tone,
                    status: obj === null || obj === void 0 ? void 0 : obj.Status,
                    isInStock: obj === null || obj === void 0 ? void 0 : obj.IsInStock,
                    certificateNumber: obj === null || obj === void 0 ? void 0 : obj.CertificateNumber,
                    actualRap: obj === null || obj === void 0 ? void 0 : obj.RapRate,
                    actualDiscount: obj === null || obj === void 0 ? void 0 : obj.RapnetDiscountPercent,
                    actualPricePerCarat: (obj === null || obj === void 0 ? void 0 : obj.Weight) ? (obj.NetAmount || 0) / obj.Weight : 0,
                    actualPrice: obj === null || obj === void 0 ? void 0 : obj.NetAmount,
                    netRapRate: obj === null || obj === void 0 ? void 0 : obj.NetRapRate,
                    netAmount: obj === null || obj === void 0 ? void 0 : obj.NetAmount,
                    rapnetDiscountPercent: obj === null || obj === void 0 ? void 0 : obj.RapnetDiscountPercent,
                    totalAmount: obj === null || obj === void 0 ? void 0 : obj.TotalAmount,
                    offeredDiscountPercent: obj === null || obj === void 0 ? void 0 : obj.OfferedDiscountPercent,
                    totalNetAmount: obj === null || obj === void 0 ? void 0 : obj.TotalNetAmount,
                    girdleName: obj === null || obj === void 0 ? void 0 : obj.GirdleName,
                    girdleCondition: obj === null || obj === void 0 ? void 0 : obj.GirdleCondition,
                    comment: obj === null || obj === void 0 ? void 0 : obj.Comment,
                    code: obj === null || obj === void 0 ? void 0 : obj.Code,
                    ratio: obj === null || obj === void 0 ? void 0 : obj.LengthByWidthRatio,
                },
                isDeleted: false,
                notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
                keyToSymbol: null,
                certificateComment: certificateComment,
                diamondType: obj.Type && Object.values(diamonds_interface_1.ELabGrownType).includes(obj === null || obj === void 0 ? void 0 : obj.Type.toLowerCase()) ? diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS : null,
                status: diamonds_interface_1.EDiamondStatus.AVAILABLE,
                motibaGemsComment: motibaGemsComment,
            });
        }
    }
    return parsedData;
};
exports.parseMaitriData = parseMaitriData;
//# sourceMappingURL=maitriParser.js.map