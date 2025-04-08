"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRapNetPriceListData = void 0;
const parseRapNetPriceListData = (dataList) => {
    if (!dataList || dataList.length === 0) {
        return [];
    }
    const parsedData = [];
    for (let index = 0; index < dataList.length; index++) {
        const rapNetPriceData = dataList[index];
        const data = {
            shape: (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.shape) ? String(rapNetPriceData.shape).toLowerCase().trim() : null,
            lowSize: (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.low_size) || (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.low_size) === 0 ? Number(rapNetPriceData.low_size) : null,
            highSize: (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.high_size) || (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.high_size) === 0 ? Number(rapNetPriceData.high_size) : null,
            color: (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.color) ? String(rapNetPriceData.color).toLowerCase().trim() : null,
            clarity: (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.clarity) ? String(rapNetPriceData.clarity).toLowerCase().trim() : null,
            price: (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.caratprice) || (rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.caratprice) === 0 ? Number(rapNetPriceData.caratprice) : null,
            rapDate: rapNetPriceData === null || rapNetPriceData === void 0 ? void 0 : rapNetPriceData.date,
        };
        parsedData.push(data);
    }
    return parsedData;
};
exports.parseRapNetPriceListData = parseRapNetPriceListData;
//# sourceMappingURL=rapnetPriceListParser.js.map