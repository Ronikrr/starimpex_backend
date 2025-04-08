"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.calculateRatioByShape = exports.formatProfitToExcelData = exports.formatPurchaseToExcelData = exports.formatOrderToExcelData = exports.formatDiamondToExcelData = exports.formatValue = exports.getEyeCleanValue = exports.formatDate = exports.getEyeCleanCondition = exports.calculatePricePerCarat = exports.calculateOurDiscount = exports.calculateOurPrice = exports.roundFloatValues = void 0;
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
const xlsxUtil_1 = require("./xlsxUtil");
const export_interface_1 = require("../interfaces/export.interface");
const roundFloatValues = (value, precision) => {
    const roundBy = Math.pow(10, precision);
    return Number(Math.round(value * roundBy) / roundBy);
};
exports.roundFloatValues = roundFloatValues;
const calculateOurPrice = (netAmount, markup) => {
    return (0, exports.roundFloatValues)(Number(netAmount + netAmount * (markup / 100)), 2);
};
exports.calculateOurPrice = calculateOurPrice;
const calculateOurDiscount = (ourPrice, rapRate, weight) => {
    return (0, exports.roundFloatValues)(Number((ourPrice * 100) / (rapRate * weight) - 100), 4);
};
exports.calculateOurDiscount = calculateOurDiscount;
const calculatePricePerCarat = (ourPrice, weight) => {
    return (0, exports.roundFloatValues)(Number(ourPrice / weight), 2);
};
exports.calculatePricePerCarat = calculatePricePerCarat;
const getEyeCleanCondition = (eyeClean) => {
    switch (eyeClean) {
        case diamonds_interface_1.EDiamondEyeClean.E0:
            return { $eq: 100 };
        case diamonds_interface_1.EDiamondEyeClean.E1:
            return { $gt: 80, $lt: 100 };
        case diamonds_interface_1.EDiamondEyeClean.E2:
            return { $gt: 70, $lte: 80 };
        case diamonds_interface_1.EDiamondEyeClean.E3:
            return { $lte: 70 };
    }
};
exports.getEyeCleanCondition = getEyeCleanCondition;
const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
};
exports.formatDate = formatDate;
const getEyeCleanValue = (eyeClean) => {
    if (eyeClean === 100) {
        return diamonds_interface_1.EDiamondEyeClean.E0;
    }
    if (eyeClean > 80) {
        return diamonds_interface_1.EDiamondEyeClean.E1;
    }
    if (eyeClean > 70) {
        return diamonds_interface_1.EDiamondEyeClean.E2;
    }
    return diamonds_interface_1.EDiamondEyeClean.E3;
};
exports.getEyeCleanValue = getEyeCleanValue;
const formatValue = (value, formatterType, searchValue, newValue, webURL, getValue) => {
    switch (formatterType) {
        case export_interface_1.EFormatterType.ALL_UPPERCASE:
            return value ? value.toUpperCase() : '-';
        case export_interface_1.EFormatterType.DIGIT:
            return value || value === 0 ? Number(value) : '-';
        case export_interface_1.EFormatterType.REPLACE_WORD:
            return value ? value.replace(searchValue, newValue).toUpperCase() : '-';
        case export_interface_1.EFormatterType.LINK:
            return value ? { hyperlink: `${webURL}/${value}`, text: 'View' } : '-';
        case export_interface_1.EFormatterType.YES_NO:
            return value ? 'YES' : 'NO';
        case export_interface_1.EFormatterType.FIRST_LETTER_UPPERCASE:
            return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '-';
        case export_interface_1.EFormatterType.CUSTOM_FUNCTION:
            return !(0, exports.isEmpty)(value) ? getValue(value) || '-' : '-';
        default:
            return value ? value : '-';
    }
};
exports.formatValue = formatValue;
const formatDiamondToExcelData = (diamonds) => {
    const finalDiamondData = [];
    const headerKeys = xlsxUtil_1.diamondHeader.map(headerData => headerData);
    for (let index = 0; index < diamonds.length; index++) {
        const data = { [headerKeys[0].key]: index + 1 };
        for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
            const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];
            let value = '';
            if (typeof getterKey === 'string') {
                const valueFromKey = isMetadata ? diamonds[index].metadata[getterKey] : diamonds[index][getterKey];
                value = (0, exports.formatValue)(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
            }
            else {
                const values = getterKey.map(getter => {
                    return (0, exports.formatValue)(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
                });
                value = values.join(', ');
            }
            data[key] = value;
        }
        finalDiamondData.push(data);
    }
    const startRow = 5;
    const endRow = startRow + diamonds.length - 1;
    const summaryRow = startRow + diamonds.length;
    const caratRow = `I${startRow}:I${endRow}`;
    const rapRow = `P${startRow}:P${endRow}`;
    const amountRow = `S${startRow}:S${endRow}`;
    const totalCaratCell = `I${summaryRow}`;
    const totalRapCell = `P${summaryRow}`;
    const totalPricePerCaratCell = `R${summaryRow}`;
    const totalAmountCell = `S${summaryRow}`;
    finalDiamondData.push({
        [headerKeys[0].key]: diamonds.length,
        [headerKeys[8].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
        [headerKeys[15].key]: {
            formula: `ROUND(SUMPRODUCT(${rapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
        },
        [headerKeys[16].key]: {
            formula: `ROUND(IF(${totalRapCell}<> 0,ROUND((${totalRapCell}-${totalPricePerCaratCell})/${totalRapCell}*-100,4),0),4)`,
        },
        [headerKeys[17].key]: { formula: `ROUND(${totalAmountCell}/${totalCaratCell},2)` },
        [headerKeys[18].key]: { formula: `ROUND(SUBTOTAL(9,${amountRow}),2)` },
    });
    return finalDiamondData;
};
exports.formatDiamondToExcelData = formatDiamondToExcelData;
const formatOrderToExcelData = (diamonds) => {
    var _a;
    const finalDiamondData = [];
    const headerKeys = xlsxUtil_1.orderHeader.map(headerData => headerData);
    for (let index = 0; index < diamonds.length; index++) {
        const data = { [headerKeys[0].key]: index + 1 };
        for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
            const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];
            let value = '';
            if (typeof getterKey === 'string') {
                const valueFromKey = isMetadata ? (((_a = diamonds[index]) === null || _a === void 0 ? void 0 : _a.metadata) ? diamonds[index].metadata[getterKey] : '-') : diamonds[index][getterKey];
                value = (0, exports.formatValue)(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
            }
            else {
                const values = getterKey.map(getter => {
                    return (0, exports.formatValue)(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
                });
                value = values.join(', ');
            }
            data[key] = value;
        }
        finalDiamondData.push(data);
    }
    const startRow = 6;
    const endRow = startRow + diamonds.length - 1;
    const summaryRow = startRow + diamonds.length;
    const caratRow = `J${startRow}:J${endRow}`;
    const rapRow = `Q${startRow}:Q${endRow}`;
    const amountRow = `T${startRow}:T${endRow}`;
    const totalCaratCell = `J${summaryRow}`;
    const totalRapCell = `Q${summaryRow}`;
    const totalPricePerCaratCell = `S${summaryRow}`;
    const totalAmountCell = `T${summaryRow}`;
    finalDiamondData.push({
        [headerKeys[0].key]: diamonds.length,
        [headerKeys[9].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
        [headerKeys[16].key]: {
            formula: `ROUND(SUMPRODUCT(${rapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
        },
        [headerKeys[17].key]: {
            formula: `ROUND(IF(${totalRapCell}<> 0,ROUND((${totalRapCell}-${totalPricePerCaratCell})/${totalRapCell}*-100,4),0),4)`,
        },
        [headerKeys[18].key]: { formula: `ROUND(${totalAmountCell}/${totalCaratCell},2)` },
        [headerKeys[19].key]: { formula: `ROUND(SUBTOTAL(9,${amountRow}),2)` },
    });
    return finalDiamondData;
};
exports.formatOrderToExcelData = formatOrderToExcelData;
const formatPurchaseToExcelData = (diamonds) => {
    var _a;
    const finalDiamondData = [];
    const headerKeys = xlsxUtil_1.purchaseHeader.map(headerData => headerData);
    for (let index = 0; index < diamonds.length; index++) {
        const data = { [headerKeys[0].key]: index + 1 };
        for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
            const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];
            let value = '';
            if (typeof getterKey === 'string') {
                const valueFromKey = isMetadata ? (((_a = diamonds[index]) === null || _a === void 0 ? void 0 : _a.metadata) ? diamonds[index].metadata[getterKey] : '-') : diamonds[index][getterKey];
                value = (0, exports.formatValue)(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
            }
            else {
                const values = getterKey.map(getter => {
                    return (0, exports.formatValue)(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
                });
                value = values.join(', ');
            }
            data[key] = value;
        }
        finalDiamondData.push(data);
    }
    const startRow = 6;
    const endRow = startRow + diamonds.length - 1;
    const summaryRow = startRow + diamonds.length;
    const caratRow = `K${startRow}:K${endRow}`;
    const rapRow = `R${startRow}:R${endRow}`;
    const amountRow = `U${startRow}:U${endRow}`;
    const totalCaratCell = `K${summaryRow}`;
    const totalRapCell = `R${summaryRow}`;
    const totalPricePerCaratCell = `T${summaryRow}`;
    const totalAmountCell = `U${summaryRow}`;
    finalDiamondData.push({
        [headerKeys[0].key]: diamonds.length,
        [headerKeys[10].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
        [headerKeys[17].key]: {
            formula: `ROUND(SUMPRODUCT(${rapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
        },
        [headerKeys[18].key]: {
            formula: `ROUND(IF(${totalRapCell}<> 0,ROUND((${totalRapCell}-${totalPricePerCaratCell})/${totalRapCell}*-100,4),0),4)`,
        },
        [headerKeys[19].key]: { formula: `ROUND(${totalAmountCell}/${totalCaratCell},2)` },
        [headerKeys[20].key]: { formula: `ROUND(SUBTOTAL(9,${amountRow}),2)` },
    });
    return finalDiamondData;
};
exports.formatPurchaseToExcelData = formatPurchaseToExcelData;
const formatProfitToExcelData = (diamonds) => {
    var _a;
    const finalDiamondData = [];
    const headerKeys = xlsxUtil_1.profitHeader.map(headerData => headerData);
    for (let index = 0; index < diamonds.length; index++) {
        const data = { [headerKeys[0].key]: index + 1 };
        for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
            const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];
            let value = '';
            if (typeof getterKey === 'string') {
                const valueFromKey = isMetadata ? (((_a = diamonds[index]) === null || _a === void 0 ? void 0 : _a.metadata) ? diamonds[index].metadata[getterKey] : '-') : diamonds[index][getterKey];
                value = (0, exports.formatValue)(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
            }
            else {
                const values = getterKey.map(getter => {
                    return (0, exports.formatValue)(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
                });
                value = values.join(', ');
            }
            data[key] = value;
        }
        finalDiamondData.push(data);
    }
    const startRow = 6;
    const endRow = startRow + diamonds.length - 1;
    const summaryRow = startRow + diamonds.length;
    const caratRow = `J${startRow}:J${endRow}`;
    const orderRapRow = `Q${startRow}:Q${endRow}`;
    const orderAmountRow = `W${startRow}:W${endRow}`;
    const totalCaratCell = `J${summaryRow}`;
    const orderTotalRapCell = `Q${summaryRow}`;
    const orderTotalPricePerCaratCell = `U${summaryRow}`;
    const orderTotalAmountCell = `W${summaryRow}`;
    const purchaseRapRow = `R${startRow}:R${endRow}`;
    const purchaseAmountRow = `X${startRow}:X${endRow}`;
    const purchaseTotalRapCell = `R${summaryRow}`;
    const purchaseTotalPricePerCaratCell = `V${summaryRow}`;
    const purchaseTotalAmountCell = `X${summaryRow}`;
    const profitTotalAmountRow = `Y${startRow}:Y${endRow}`;
    finalDiamondData.push({
        [headerKeys[0].key]: diamonds.length,
        [headerKeys[9].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
        [headerKeys[16].key]: {
            formula: `ROUND(SUMPRODUCT(${orderRapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
        },
        [headerKeys[17].key]: {
            formula: `ROUND(SUMPRODUCT(${purchaseRapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
        },
        [headerKeys[18].key]: {
            formula: `ROUND(IF(${orderTotalRapCell}<> 0,ROUND((${orderTotalRapCell}-${orderTotalPricePerCaratCell})/${orderTotalRapCell}*-100,4),0),4)`,
        },
        [headerKeys[19].key]: {
            formula: `ROUND(IF(${purchaseTotalRapCell}<> 0,ROUND((${purchaseTotalRapCell}-${purchaseTotalPricePerCaratCell})/${purchaseTotalRapCell}*-100,4),0),4)`,
        },
        [headerKeys[20].key]: { formula: `ROUND(${orderTotalAmountCell}/${totalCaratCell},2)` },
        [headerKeys[21].key]: { formula: `ROUND(${purchaseTotalAmountCell}/${totalCaratCell},2)` },
        [headerKeys[22].key]: { formula: `ROUND(SUBTOTAL(9,${orderAmountRow}),2)` },
        [headerKeys[23].key]: { formula: `ROUND(SUBTOTAL(9,${purchaseAmountRow}),2)` },
        [headerKeys[24].key]: { formula: `ROUND(SUBTOTAL(9,${profitTotalAmountRow}),2)` },
    });
    return finalDiamondData;
};
exports.formatProfitToExcelData = formatProfitToExcelData;
const calculateRatioByShape = (shape, width, length) => {
    if (!width || !length) {
        return 0;
    }
    if (shape === 'heart') {
        return Number((width / length).toFixed(2));
    }
    return Number((length / width).toFixed(2));
};
exports.calculateRatioByShape = calculateRatioByShape;
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (typeof value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
//# sourceMappingURL=helpers.js.map