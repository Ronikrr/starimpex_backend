import ExcelJS, { Alignment, Borders } from 'exceljs';
import { diamondHeader, orderHeader, profitHeader, purchaseHeader } from './xlsxUtil';
import { formatDate } from './helpers';

export const getDiamondExcelBuffer = async (data: Array<any>, sheetName: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.addRow(['']);
  worksheet.mergeCells('D2:S2');
  const headerCell = worksheet.getCell('D2');
  headerCell.value = 'MOTIBA GEMS';
  headerCell.font = { ...headerCell.font, size: 22, bold: true, name: 'Poppins' };
  headerCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.addRow(['']);

  const headers = [];
  for (const headerObj of diamondHeader) {
    headers.push({ ...headerObj });
  }
  worksheet.columns = headers.map(header => {
    const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
    const longestLength =
      header.key !== 'videoLink' && header.key !== 'certificateLink'
        ? currentColumnAllValues
            .reduce(function (a, b) {
              return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, 'value')
            .toString().length
        : header.header.length;

    const width = longestLength > header.header.length ? longestLength : header.header.length;
    const isNumberFormat = header?.style?.numFmt === '0.00';
    const increaseWidthBy = isNumberFormat ? (header.key !== 'rap' ? 4 : 6) : 2;

    return { key: header.key, width: width + increaseWidthBy, style: header?.style };
  });
  worksheet.getRow(4).values = headers.map(data => data.header);
  worksheet.addRows(data);

  const fontStyle = { bold: true, name: 'Poppins' };
  const fillStyle: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
  const borderStyle: Partial<Borders> = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
  };
  const alignmentStyle: Partial<Alignment> = { horizontal: 'center' };

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
        currentRowCell.font = { ...currentRowCell.font, color: { argb: '00008000' } };
      }
    }

    const currentVideoCell = worksheet.getCell(`${videoLinkCell}${5 + index}`);
    currentVideoCell.font = { ...currentVideoCell.font, ...linkStyle };

    const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${5 + index}`);
    currentCertificateCell.font = { ...currentCertificateCell.font, ...linkStyle };
  }

  const excelBuffer = await workbook.xlsx.writeBuffer();

  return excelBuffer;
};

export const getOrderExcelBuffer = async (data: Array<any>, sheetName: string, fromDate?: Date, toDate?: Date) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.addRow(['']);
  worksheet.mergeCells('D2:S2');
  const headerCell = worksheet.getCell('D2');
  headerCell.value = 'MOTIBA GEMS';
  headerCell.font = { ...headerCell.font, size: 22, bold: true, name: 'Poppins' };
  headerCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.mergeCells('D3:S3');
  const reportHeaderCell = worksheet.getCell('D3');
  const reportDateRange = fromDate && toDate ? ` [${formatDate(fromDate)} TO ${formatDate(toDate)}]` : '';
  reportHeaderCell.value = `SALES REPORT${reportDateRange}`;
  reportHeaderCell.font = { ...reportHeaderCell.font, size: 14, bold: true, name: 'Poppins', color: { argb: '00024093' } };
  reportHeaderCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.addRow(['']);

  const headers = [];
  for (const headerObj of orderHeader) {
    headers.push({ ...headerObj });
  }
  worksheet.columns = headers.map(header => {
    const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
    const longestLength =
      header.key !== 'videoLink' && header.key !== 'certificateLink'
        ? currentColumnAllValues
            .reduce(function (a, b) {
              return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, '')
            .toString().length
        : header.header.length;

    const width = longestLength > header.header.length ? longestLength : header.header.length;
    const isNumberFormat = header?.style?.numFmt === '0.00';
    const increaseWidthBy = isNumberFormat ? (header.key !== 'rap' ? 4 : 6) : 2;

    return { key: header.key, width: width + increaseWidthBy, style: header?.style };
  });
  worksheet.getRow(5).values = headers.map(data => data.header);
  worksheet.addRows(data);

  const fontStyle = { bold: true, name: 'Poppins' };
  const fillStyle: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
  const borderStyle: Partial<Borders> = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
  };
  const alignmentStyle: Partial<Alignment> = { horizontal: 'center' };

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
        currentRowCell.font = { ...currentRowCell.font, color: { argb: '00008000' } };
      }
    }

    if (data[index].videoLink !== '-') {
      const currentVideoCell = worksheet.getCell(`${videoLinkCell}${6 + index}`);
      currentVideoCell.font = { ...currentVideoCell.font, ...linkStyle };
    }

    if (data[index].certificateLink !== '-') {
      const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${6 + index}`);
      currentCertificateCell.font = { ...currentCertificateCell.font, ...linkStyle };
    }
  }

  const excelBuffer = await workbook.xlsx.writeBuffer();

  return excelBuffer;
};

export const getPurchaseExcelBuffer = async (data: Array<any>, sheetName: string, fromDate?: Date, toDate?: Date) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.addRow(['']);
  worksheet.mergeCells('D2:S2');
  const headerCell = worksheet.getCell('D2');
  headerCell.value = 'MOTIBA GEMS';
  headerCell.font = { ...headerCell.font, size: 22, bold: true, name: 'Poppins' };
  headerCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.mergeCells('D3:S3');
  const reportHeaderCell = worksheet.getCell('D3');
  const reportDateRange = fromDate && toDate ? ` [${formatDate(fromDate)} TO ${formatDate(toDate)}]` : '';
  reportHeaderCell.value = `PURCHASE REPORT${reportDateRange}`;
  reportHeaderCell.font = { ...reportHeaderCell.font, size: 14, bold: true, name: 'Poppins', color: { argb: '00024093' } };
  reportHeaderCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.addRow(['']);

  const headers = [];
  for (const headerObj of purchaseHeader) {
    headers.push({ ...headerObj });
  }
  worksheet.columns = headers.map(header => {
    const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
    const longestLength =
      header.key !== 'videoLink' && header.key !== 'certificateLink'
        ? currentColumnAllValues
            .reduce(function (a, b) {
              return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, '')
            .toString().length
        : header.header.length;

    const width = longestLength > header.header.length ? longestLength : header.header.length;
    const isNumberFormat = header?.style?.numFmt === '0.00';
    const increaseWidthBy = isNumberFormat ? (header.key !== 'rap' ? 4 : 6) : 2;

    return { key: header.key, width: width + increaseWidthBy, style: header?.style };
  });
  worksheet.getRow(5).values = headers.map(data => data.header);
  worksheet.addRows(data);

  const fontStyle = { bold: true, name: 'Poppins' };
  const fillStyle: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
  const borderStyle: Partial<Borders> = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
  };
  const alignmentStyle: Partial<Alignment> = { horizontal: 'center' };

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
        currentRowCell.font = { ...currentRowCell.font, color: { argb: '00008000' } };
      }
    }

    if (data[index].videoLink !== '-') {
      const currentVideoCell = worksheet.getCell(`${videoLinkCell}${6 + index}`);
      currentVideoCell.font = { ...currentVideoCell.font, ...linkStyle };
    }

    if (data[index].certificateLink !== '-') {
      const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${6 + index}`);
      currentCertificateCell.font = { ...currentCertificateCell.font, ...linkStyle };
    }
  }

  const excelBuffer = await workbook.xlsx.writeBuffer();

  return excelBuffer;
};

export const getProfitExcelBuffer = async (data: Array<any>, sheetName: string, fromDate: Date, toDate: Date) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.addRow(['']);
  worksheet.mergeCells('D2:S2');
  const headerCell = worksheet.getCell('D2');
  headerCell.value = 'MOTIBA GEMS';
  headerCell.font = { ...headerCell.font, size: 22, bold: true, name: 'Poppins' };
  headerCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.mergeCells('D3:S3');
  const reportHeaderCell = worksheet.getCell('D3');
  reportHeaderCell.value = `PROFIT REPORT [${formatDate(fromDate)} TO ${formatDate(toDate)}]`;
  reportHeaderCell.font = { ...reportHeaderCell.font, size: 14, bold: true, name: 'Poppins', color: { argb: '00024093' } };
  reportHeaderCell.alignment = { ...headerCell.alignment, horizontal: 'center', vertical: 'middle' };
  worksheet.addRow(['']);

  const headers = [];
  for (const headerObj of profitHeader) {
    headers.push({ ...headerObj });
  }
  worksheet.columns = headers.map(header => {
    const currentColumnAllValues = data.slice(0, -1).map(diamondData => diamondData[header.key] || '');
    const longestLength =
      header.key !== 'videoLink' && header.key !== 'certificateLink'
        ? currentColumnAllValues
            .reduce(function (a, b) {
              return (a || '').toString().length > (b || '').toString().length ? a : b;
            }, '')
            .toString().length
        : header.header.length;

    const width = longestLength > header.header.length ? longestLength : header.header.length;
    const isNumberFormat = header?.style?.numFmt === '0.00';
    const increaseWidthBy = isNumberFormat ? 4 : 2;

    return { key: header.key, width: width + increaseWidthBy, style: header?.style };
  });
  worksheet.getRow(5).values = headers.map(data => data.header);
  worksheet.addRows(data);

  const fontStyle = { bold: true, name: 'Poppins' };
  const fillStyle: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00CFDBEB' } };
  const borderStyle: Partial<Borders> = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },
  };
  const alignmentStyle: Partial<Alignment> = { horizontal: 'center' };

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
        currentRowCell.font = { ...currentRowCell.font, color: { argb: '00008000' } };
      }
    }

    if (data[index].videoLink !== '-') {
      const currentVideoCell = worksheet.getCell(`${videoLinkCell}${6 + index}`);
      currentVideoCell.font = { ...currentVideoCell.font, ...linkStyle };
    }

    if (data[index].certificateLink !== '-') {
      const currentCertificateCell = worksheet.getCell(`${certificateLinkCell}${6 + index}`);
      currentCertificateCell.font = { ...currentCertificateCell.font, ...linkStyle };
    }
  }

  const excelBuffer = await workbook.xlsx.writeBuffer();

  return excelBuffer;
};
