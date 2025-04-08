"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFileData = void 0;
const config_1 = require("../../config");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const uploadViaFile_1 = require("../uploadViaFile");
const regex_1 = require("../regex");
const helpers_1 = require("../helpers");
const parseFileData = (data) => {
    if (!data) {
        return;
    }
    const parsedData = [];
    const soldUniqueStoneIds = [];
    for (const obj of data) {
        const isAvailable = obj[56] && obj[56].toLowerCase() === diamonds_interface_1.EDiamondStatus.AVAILABLE;
        const stoneNo = (obj === null || obj === void 0 ? void 0 : obj[0]) ? obj[0].toString().trim() : null;
        if (stoneNo && !isAvailable) {
            soldUniqueStoneIds.push(`${diamonds_interface_1.ESourceType.FILE}_${stoneNo}`);
        }
        if (stoneNo && isAvailable) {
            const shape = (obj === null || obj === void 0 ? void 0 : obj[2]) ? obj[2].toLowerCase() : null;
            let width = (obj === null || obj === void 0 ? void 0 : obj[24]) ? Number(obj[24]) : null;
            let length = (obj === null || obj === void 0 ? void 0 : obj[36]) ? Number(obj[36]) : null;
            let height = (obj === null || obj === void 0 ? void 0 : obj[25]) ? Number(obj[25]) : null;
            const measurement = (obj === null || obj === void 0 ? void 0 : obj[23]) ? obj[23] : null;
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
            const ratio = (obj === null || obj === void 0 ? void 0 : obj[48]) ? Number(obj[48]) : (0, helpers_1.calculateRatioByShape)(shape, width, length);
            parsedData.push({
                stoneNo: `${config_1.FILE_STONE_NUMBER_PREFIX}${stoneNo}`,
                source: diamonds_interface_1.ESourceType.FILE,
                uniqueStoneId: `${diamonds_interface_1.ESourceType.FILE}_${stoneNo}`,
                lab: (obj === null || obj === void 0 ? void 0 : obj[1]) ? obj[1].toLowerCase() : null,
                shape: shape,
                caratWeight: (obj === null || obj === void 0 ? void 0 : obj[3]) || (obj === null || obj === void 0 ? void 0 : obj[3]) === 0 ? Number(obj[3]) : null,
                color: (obj === null || obj === void 0 ? void 0 : obj[4]) ? obj[4].toLowerCase() : null,
                clarity: (obj === null || obj === void 0 ? void 0 : obj[5]) ? obj[5].toLowerCase() : null,
                cut: (obj === null || obj === void 0 ? void 0 : obj[6]) ? obj[6].toLowerCase() : null,
                polish: (obj === null || obj === void 0 ? void 0 : obj[7]) ? obj[7].toLowerCase() : null,
                symmetry: (obj === null || obj === void 0 ? void 0 : obj[8]) ? obj[8].toLowerCase() : null,
                diamondType: (obj === null || obj === void 0 ? void 0 : obj[9])
                    ? obj[9].toLowerCase() === uploadViaFile_1.diamondTypeValues[0]
                        ? diamonds_interface_1.EDiamondType.LAB_GROWN_DIAMONDS
                        : obj[9].toLowerCase() === uploadViaFile_1.diamondTypeValues[1]
                            ? diamonds_interface_1.EDiamondType.NATURAL_DIAMONDS
                            : null
                    : null,
                type: (obj === null || obj === void 0 ? void 0 : obj[10]) ? obj[10].toLowerCase() : null,
                shade: (obj === null || obj === void 0 ? void 0 : obj[11]) ? obj[11].toLowerCase() : null,
                rap: (obj === null || obj === void 0 ? void 0 : obj[12]) || (obj === null || obj === void 0 ? void 0 : obj[12]) === 0 ? Number(obj[12]) : null,
                pricePerCarat: (obj === null || obj === void 0 ? void 0 : obj[13]) || (obj === null || obj === void 0 ? void 0 : obj[13]) === 0 ? Number(obj[13]) : null,
                ourDiscount: (obj === null || obj === void 0 ? void 0 : obj[14]) || (obj === null || obj === void 0 ? void 0 : obj[14]) === 0 ? Number(obj[14]) : null,
                ourPrice: (obj === null || obj === void 0 ? void 0 : obj[15]) || (obj === null || obj === void 0 ? void 0 : obj[15]) === 0 ? Number(obj[15]) : null,
                inscription: (obj === null || obj === void 0 ? void 0 : obj[16]) ? obj[16].toLowerCase() : null,
                noBGM: typeof (obj === null || obj === void 0 ? void 0 : obj[17]) !== 'undefined' ? obj[17].toLowerCase() === 'yes' : null,
                country: (obj === null || obj === void 0 ? void 0 : obj[18]) ? obj[18].toLowerCase() : null,
                city: (obj === null || obj === void 0 ? void 0 : obj[19]) ? obj[19].toLowerCase() : null,
                luster: (obj === null || obj === void 0 ? void 0 : obj[20]) ? obj[20].toLowerCase() : null,
                milky: (obj === null || obj === void 0 ? void 0 : obj[21]) ? obj[21].toLowerCase() : null,
                eyeClean: (obj === null || obj === void 0 ? void 0 : obj[22]) || (obj === null || obj === void 0 ? void 0 : obj[22]) === 0 ? Number(obj[22]) : null,
                measurement: measurement,
                width: width,
                height: height,
                florescence: (obj === null || obj === void 0 ? void 0 : obj[26]) ? obj[26].toLowerCase() : null,
                inclusion: (obj === null || obj === void 0 ? void 0 : obj[27]) ? obj[27].toLowerCase() : null,
                extraFacet: (obj === null || obj === void 0 ? void 0 : obj[28]) ? obj[28] : null,
                internalGraining: (obj === null || obj === void 0 ? void 0 : obj[29]) ? obj[29] : null,
                surfaceGraining: (obj === null || obj === void 0 ? void 0 : obj[30]) ? obj[30] : null,
                heartsAndArrows: typeof (obj === null || obj === void 0 ? void 0 : obj[31]) !== 'undefined' ? obj[31] === 'yes' : null,
                culetSize: (obj === null || obj === void 0 ? void 0 : obj[32]) ? obj[32].toLowerCase() : null,
                fancyColor: (obj === null || obj === void 0 ? void 0 : obj[33]) ? obj[33].toLowerCase() : null,
                fancyIntensity: (obj === null || obj === void 0 ? void 0 : obj[34]) ? obj[34].toLowerCase() : null,
                fancyOvertone: (obj === null || obj === void 0 ? void 0 : obj[35]) ? obj[35].toLowerCase() : null,
                length: length,
                depthPercentage: (obj === null || obj === void 0 ? void 0 : obj[37]) || (obj === null || obj === void 0 ? void 0 : obj[37]) === 0 ? Number(obj[37]) : null,
                tablePercentage: (obj === null || obj === void 0 ? void 0 : obj[38]) || (obj === null || obj === void 0 ? void 0 : obj[38]) === 0 ? Number(obj[38]) : null,
                crownAngle: (obj === null || obj === void 0 ? void 0 : obj[39]) || (obj === null || obj === void 0 ? void 0 : obj[39]) === 0 ? Number(obj[39]) : null,
                crownHeight: (obj === null || obj === void 0 ? void 0 : obj[40]) || (obj === null || obj === void 0 ? void 0 : obj[40]) === 0 ? Number(obj[40]) : null,
                pavilionAngle: (obj === null || obj === void 0 ? void 0 : obj[41]) || (obj === null || obj === void 0 ? void 0 : obj[41]) === 0 ? Number(obj[41]) : null,
                pavilionHeight: (obj === null || obj === void 0 ? void 0 : obj[42]) || (obj === null || obj === void 0 ? void 0 : obj[42]) === 0 ? Number(obj[42]) : null,
                starLength: (obj === null || obj === void 0 ? void 0 : obj[43]) ? obj[43] : null,
                lowerHalves: (obj === null || obj === void 0 ? void 0 : obj[44]) ? obj[44] : null,
                girdleType: (obj === null || obj === void 0 ? void 0 : obj[45]) ? obj[45].toLowerCase() : null,
                girdlePercentage: (obj === null || obj === void 0 ? void 0 : obj[46]) || (obj === null || obj === void 0 ? void 0 : obj[46]) === 0 ? Number(obj[46]) : null,
                metadata: {
                    girdleCondition: (obj === null || obj === void 0 ? void 0 : obj[47]) ? obj[47].toLowerCase() : null,
                    ratio: obj === null || obj === void 0 ? void 0 : obj[48],
                    actualRap: (obj === null || obj === void 0 ? void 0 : obj[12]) || (obj === null || obj === void 0 ? void 0 : obj[12]) === 0 ? Number(obj[12]) : null,
                    actualDiscount: (obj === null || obj === void 0 ? void 0 : obj[14]) || (obj === null || obj === void 0 ? void 0 : obj[14]) === 0 ? Number(obj[14]) : null,
                    actualPricePerCarat: (obj === null || obj === void 0 ? void 0 : obj[13]) || (obj === null || obj === void 0 ? void 0 : obj[13]) === 0 ? Number(obj[13]) : null,
                    actualPrice: (obj === null || obj === void 0 ? void 0 : obj[15]) || (obj === null || obj === void 0 ? void 0 : obj[15]) === 0 ? Number(obj[15]) : null,
                },
                ratio: ratio,
                videoLink: (obj === null || obj === void 0 ? void 0 : obj[49]) ? obj[49] : null,
                imageLink: (obj === null || obj === void 0 ? void 0 : obj[50]) ? obj[50] : null,
                certificateLink: (obj === null || obj === void 0 ? void 0 : obj[51]) ? obj[51] : null,
                keyToSymbol: (obj === null || obj === void 0 ? void 0 : obj[52]) ? obj[52].toLowerCase() : null,
                notes: (obj === null || obj === void 0 ? void 0 : obj[53]) ? obj[53] : null,
                motibaGemsComment: (obj === null || obj === void 0 ? void 0 : obj[54]) ? obj[54] : null,
                certificateComment: (obj === null || obj === void 0 ? void 0 : obj[55]) ? obj[55] : null,
                status: diamonds_interface_1.EDiamondStatus.AVAILABLE,
                isDeleted: false,
            });
        }
    }
    return { parsedData, soldUniqueStoneIds };
};
exports.parseFileData = parseFileData;
//# sourceMappingURL=fileParse.js.map