"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfitExcelBuffer = exports.getPurchaseExcelBuffer = exports.getOrderExcelBuffer = exports.getDiamondExcelBuffer = void 0;
const tslib_1 = require("tslib");
const exceljs_1 = tslib_1.__importDefault(require("exceljs"));
const xlsxUtil_1 = require("./xlsxUtil");
const helpers_1 = require("./helpers");
const getDiamondExcelBuffer = async (data, sheetName) => {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.addRow(['']);
    worksheet.mergeCells('D2:S2');
    const headerCell = worksheet.getCell('D2');
    headerCell.value = 'MOTIBA GEMS';
    headerCell.font = Object.assign(Object.assign({}, headerCell.font), { size: 22, bold: true, name: 'Poppins' });
    headerCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.addRow(['']);
    const headers = [];
    for (const headerObj of xlsxUtil_1.diamondHeader) {
        headers.push(Object.assign({}, headerObj));
    }
    worksheet.columns = headers.map(header => {
        var _a;
        const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
        const longestLength = header.key !== 'videoLink' && header.key !== 'certificateLink'
            ? currentColumnAllValues
                .reduce(function (a, b) {
                return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, 'value')
                .toString().length
            : header.header.length;
        const width = longestLength > header.header.length ? longestLength : header.header.length;
        const isNumberFormat = ((_a = header === null || header === void 0 ? void 0 : header.style) === null || _a === void 0 ? void 0 : _a.numFmt) === '0.00';
        const increaseWidthBy = isNumberFormat ? (header.key !== 'rap' ? 4 : 6) : 2;
        return { key: header.key, width: width + increaseWidthBy, style: header === null || header === void 0 ? void 0 : header.style };
    });
    worksheet.getRow(4).values = headers.map(data => data.header);
    worksheet.addRows(data);
    const fontStyle = { bold: true, name: 'Poppins' };
    const fillStyle = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
    const borderStyle = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    };
    const alignmentStyle = { horizontal: 'center' };
    const headerRow = worksheet.getRow(4);
    const lastRow = worksheet.lastRow;
    for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
        headerRow.getCell(columnIndex).font = fontStyle;
        headerRow.getCell(columnIndex).fill = fillStyle;
        headerRow.getCell(columnIndex).border = borderStyle;
        headerRow.getCell(columnIndex).alignment = alignmentStyle;
        lastRow.getCell(columnIndex).font = fontStyle;
        lastRow.getCell(columnIndex).fill = fillStyle;
        lastRow.getCell(columnIndex).border = borderStyle;
        lastRow.getCell(columnIndex).alignment = alignmentStyle;
    }
    const linkStyle = { underline: true, color: { argb: 'FF0000FF' } };
    const videoLinkCell = 'C';
    const certificateLinkCell = 'D';
    for (let index = 0; index < data.length - 1; index++) {
        for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
            const currentRowCell = worksheet.getRow(5 + index).getCell(columnIndex);
            currentRowCell.border = borderStyle;
            currentRowCell.font = { name: 'Poppins' };
            currentRowCell.alignment = alignmentStyle;
            if (columnIndex === headers.length) {
                currentRowCell.font = Object.assign(Object.assign({}, currentRowCell.font), { color: { argb: '00008000' } });
            }
        }
        const currentVideoCell = worksheet.getCell(`${videoLinkCell}${5 + index}`);
        currentVideoCell.font = Object.assign(Object.assign({}, currentVideoCell.font), linkStyle);
        const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${5 + index}`);
        currentCertificateCell.font = Object.assign(Object.assign({}, currentCertificateCell.font), linkStyle);
    }
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer;
};
exports.getDiamondExcelBuffer = getDiamondExcelBuffer;
const getOrderExcelBuffer = async (data, sheetName, fromDate, toDate) => {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.addRow(['']);
    worksheet.mergeCells('D2:S2');
    const headerCell = worksheet.getCell('D2');
    headerCell.value = 'MOTIBA GEMS';
    headerCell.font = Object.assign(Object.assign({}, headerCell.font), { size: 22, bold: true, name: 'Poppins' });
    headerCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.mergeCells('D3:S3');
    const reportHeaderCell = worksheet.getCell('D3');
    const reportDateRange = fromDate && toDate ? ` [${(0, helpers_1.formatDate)(fromDate)} TO ${(0, helpers_1.formatDate)(toDate)}]` : '';
    reportHeaderCell.value = `SALES REPORT${reportDateRange}`;
    reportHeaderCell.font = Object.assign(Object.assign({}, reportHeaderCell.font), { size: 14, bold: true, name: 'Poppins', color: { argb: '00024093' } });
    reportHeaderCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.addRow(['']);
    const headers = [];
    for (const headerObj of xlsxUtil_1.orderHeader) {
        headers.push(Object.assign({}, headerObj));
    }
    worksheet.columns = headers.map(header => {
        var _a;
        const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
        const longestLength = header.key !== 'videoLink' && header.key !== 'certificateLink'
            ? currentColumnAllValues
                .reduce(function (a, b) {
                return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, '')
                .toString().length
            : header.header.length;
        const width = longestLength > header.header.length ? longestLength : header.header.length;
        const isNumberFormat = ((_a = header === null || header === void 0 ? void 0 : header.style) === null || _a === void 0 ? void 0 : _a.numFmt) === '0.00';
        const increaseWidthBy = isNumberFormat ? (header.key !== 'rap' ? 4 : 6) : 2;
        return { key: header.key, width: width + increaseWidthBy, style: header === null || header === void 0 ? void 0 : header.style };
    });
    worksheet.getRow(5).values = headers.map(data => data.header);
    worksheet.addRows(data);
    const fontStyle = { bold: true, name: 'Poppins' };
    const fillStyle = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
    const borderStyle = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    };
    const alignmentStyle = { horizontal: 'center' };
    const headerRow = worksheet.getRow(5);
    const lastRow = worksheet.lastRow;
    for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
        headerRow.getCell(columnIndex).font = fontStyle;
        headerRow.getCell(columnIndex).fill = fillStyle;
        headerRow.getCell(columnIndex).border = borderStyle;
        headerRow.getCell(columnIndex).alignment = alignmentStyle;
        lastRow.getCell(columnIndex).font = fontStyle;
        lastRow.getCell(columnIndex).fill = fillStyle;
        lastRow.getCell(columnIndex).border = borderStyle;
        lastRow.getCell(columnIndex).alignment = alignmentStyle;
    }
    const linkStyle = { underline: true, color: { argb: 'FF0000FF' } };
    const videoLinkCell = 'D';
    const certificateLinkCell = 'E';
    for (let index = 0; index < data.length - 1; index++) {
        for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
            const currentRowCell = worksheet.getRow(6 + index).getCell(columnIndex);
            currentRowCell.border = borderStyle;
            currentRowCell.font = { name: 'Poppins' };
            currentRowCell.alignment = alignmentStyle;
            if (columnIndex === headers.length) {
                currentRowCell.font = Object.assign(Object.assign({}, currentRowCell.font), { color: { argb: '00008000' } });
            }
        }
        if (data[index].videoLink !== '-') {
            const currentVideoCell = worksheet.getCell(`${videoLinkCell}${6 + index}`);
            currentVideoCell.font = Object.assign(Object.assign({}, currentVideoCell.font), linkStyle);
        }
        if (data[index].certificateLink !== '-') {
            const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${6 + index}`);
            currentCertificateCell.font = Object.assign(Object.assign({}, currentCertificateCell.font), linkStyle);
        }
    }
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer;
};
exports.getOrderExcelBuffer = getOrderExcelBuffer;
const getPurchaseExcelBuffer = async (data, sheetName, fromDate, toDate) => {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.addRow(['']);
    worksheet.mergeCells('D2:S2');
    const headerCell = worksheet.getCell('D2');
    headerCell.value = 'MOTIBA GEMS';
    headerCell.font = Object.assign(Object.assign({}, headerCell.font), { size: 22, bold: true, name: 'Poppins' });
    headerCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.mergeCells('D3:S3');
    const reportHeaderCell = worksheet.getCell('D3');
    const reportDateRange = fromDate && toDate ? ` [${(0, helpers_1.formatDate)(fromDate)} TO ${(0, helpers_1.formatDate)(toDate)}]` : '';
    reportHeaderCell.value = `PURCHASE REPORT${reportDateRange}`;
    reportHeaderCell.font = Object.assign(Object.assign({}, reportHeaderCell.font), { size: 14, bold: true, name: 'Poppins', color: { argb: '00024093' } });
    reportHeaderCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.addRow(['']);
    const headers = [];
    for (const headerObj of xlsxUtil_1.purchaseHeader) {
        headers.push(Object.assign({}, headerObj));
    }
    worksheet.columns = headers.map(header => {
        var _a;
        const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
        const longestLength = header.key !== 'videoLink' && header.key !== 'certificateLink'
            ? currentColumnAllValues
                .reduce(function (a, b) {
                return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, '')
                .toString().length
            : header.header.length;
        const width = longestLength > header.header.length ? longestLength : header.header.length;
        const isNumberFormat = ((_a = header === null || header === void 0 ? void 0 : header.style) === null || _a === void 0 ? void 0 : _a.numFmt) === '0.00';
        const increaseWidthBy = isNumberFormat ? (header.key !== 'rap' ? 4 : 6) : 2;
        return { key: header.key, width: width + increaseWidthBy, style: header === null || header === void 0 ? void 0 : header.style };
    });
    worksheet.getRow(5).values = headers.map(data => data.header);
    worksheet.addRows(data);
    const fontStyle = { bold: true, name: 'Poppins' };
    const fillStyle = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
    const borderStyle = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    };
    const alignmentStyle = { horizontal: 'center' };
    const headerRow = worksheet.getRow(5);
    const lastRow = worksheet.lastRow;
    for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
        headerRow.getCell(columnIndex).font = fontStyle;
        headerRow.getCell(columnIndex).fill = fillStyle;
        headerRow.getCell(columnIndex).border = borderStyle;
        headerRow.getCell(columnIndex).alignment = alignmentStyle;
        lastRow.getCell(columnIndex).font = fontStyle;
        lastRow.getCell(columnIndex).fill = fillStyle;
        lastRow.getCell(columnIndex).border = borderStyle;
        lastRow.getCell(columnIndex).alignment = alignmentStyle;
    }
    const linkStyle = { underline: true, color: { argb: 'FF0000FF' } };
    const videoLinkCell = 'E';
    const certificateLinkCell = 'F';
    for (let index = 0; index < data.length - 1; index++) {
        for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
            const currentRowCell = worksheet.getRow(6 + index).getCell(columnIndex);
            currentRowCell.border = borderStyle;
            currentRowCell.font = { name: 'Poppins' };
            currentRowCell.alignment = alignmentStyle;
            if (columnIndex === headers.length) {
                currentRowCell.font = Object.assign(Object.assign({}, currentRowCell.font), { color: { argb: '00008000' } });
            }
        }
        if (data[index].videoLink !== '-') {
            const currentVideoCell = worksheet.getCell(`${videoLinkCell}${6 + index}`);
            currentVideoCell.font = Object.assign(Object.assign({}, currentVideoCell.font), linkStyle);
        }
        if (data[index].certificateLink !== '-') {
            const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${6 + index}`);
            currentCertificateCell.font = Object.assign(Object.assign({}, currentCertificateCell.font), linkStyle);
        }
    }
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer;
};
exports.getPurchaseExcelBuffer = getPurchaseExcelBuffer;
const getProfitExcelBuffer = async (data, sheetName, fromDate, toDate) => {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.addRow(['']);
    worksheet.mergeCells('D2:S2');
    const headerCell = worksheet.getCell('D2');
    headerCell.value = 'MOTIBA GEMS';
    headerCell.font = Object.assign(Object.assign({}, headerCell.font), { size: 22, bold: true, name: 'Poppins' });
    headerCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.mergeCells('D3:S3');
    const reportHeaderCell = worksheet.getCell('D3');
    reportHeaderCell.value = `PROFIT REPORT [${(0, helpers_1.formatDate)(fromDate)} TO ${(0, helpers_1.formatDate)(toDate)}]`;
    reportHeaderCell.font = Object.assign(Object.assign({}, reportHeaderCell.font), { size: 14, bold: true, name: 'Poppins', color: { argb: '00024093' } });
    reportHeaderCell.alignment = Object.assign(Object.assign({}, headerCell.alignment), { horizontal: 'center', vertical: 'middle' });
    worksheet.addRow(['']);
    const headers = [];
    for (const headerObj of xlsxUtil_1.profitHeader) {
        headers.push(Object.assign({}, headerObj));
    }
    worksheet.columns = headers.map(header => {
        var _a;
        const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
        const longestLength = header.key !== 'videoLink' && header.key !== 'certificateLink'
            ? currentColumnAllValues
                .reduce(function (a, b) {
                return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, '')
                .toString().length
            : header.header.length;
        const width = longestLength > header.header.length ? longestLength : header.header.length;
        const isNumberFormat = ((_a = header === null || header === void 0 ? void 0 : header.style) === null || _a === void 0 ? void 0 : _a.numFmt) === '0.00';
        const increaseWidthBy = isNumberFormat ? 4 : 2;
        return { key: header.key, width: width + increaseWidthBy, style: header === null || header === void 0 ? void 0 : header.style };
    });
    worksheet.getRow(5).values = headers.map(data => data.header);
    worksheet.addRows(data);
    const fontStyle = { bold: true, name: 'Poppins' };
    const fillStyle = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
    const borderStyle = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    };
    const alignmentStyle = { horizontal: 'center' };
    const headerRow = worksheet.getRow(5);
    const lastRow = worksheet.lastRow;
    for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
        headerRow.getCell(columnIndex).font = fontStyle;
        headerRow.getCell(columnIndex).fill = fillStyle;
        headerRow.getCell(columnIndex).border = borderStyle;
        headerRow.getCell(columnIndex).alignment = alignmentStyle;
        lastRow.getCell(columnIndex).font = fontStyle;
        lastRow.getCell(columnIndex).fill = fillStyle;
        lastRow.getCell(columnIndex).border = borderStyle;
        lastRow.getCell(columnIndex).alignment = alignmentStyle;
    }
    const linkStyle = { underline: true, color: { argb: 'FF0000FF' } };
    const videoLinkCell = 'D';
    const certificateLinkCell = 'E';
    for (let index = 0; index < data.length - 1; index++) {
        for (let columnIndex = 1; columnIndex <= headers.length; columnIndex++) {
            const currentRowCell = worksheet.getRow(6 + index).getCell(columnIndex);
            currentRowCell.border = borderStyle;
            currentRowCell.font = { name: 'Poppins' };
            currentRowCell.alignment = alignmentStyle;
            if (columnIndex === headers.length) {
                currentRowCell.font = Object.assign(Object.assign({}, currentRowCell.font), { color: { argb: '00008000' } });
            }
        }
        if (data[index].videoLink !== '-') {
            const currentVideoCell = worksheet.getCell(`${videoLinkCell}${6 + index}`);
            currentVideoCell.font = Object.assign(Object.assign({}, currentVideoCell.font), linkStyle);
        }
        if (data[index].certificateLink !== '-') {
            const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${6 + index}`);
            currentCertificateCell.font = Object.assign(Object.assign({}, currentCertificateCell.font), linkStyle);
        }
    }
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return excelBuffer;
};
exports.getProfitExcelBuffer = getProfitExcelBuffer;
//# sourceMappingURL=fileExport.js.map