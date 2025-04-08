import ExcelJS from 'exceljs';
export declare const getDiamondExcelBuffer: (data: Array<any>, sheetName: string) => Promise<ExcelJS.Buffer>;
export declare const getOrderExcelBuffer: (data: Array<any>, sheetName: string, fromDate?: Date, toDate?: Date) => Promise<ExcelJS.Buffer>;
export declare const getPurchaseExcelBuffer: (data: Array<any>, sheetName: string, fromDate?: Date, toDate?: Date) => Promise<ExcelJS.Buffer>;
export declare const getProfitExcelBuffer: (data: Array<any>, sheetName: string, fromDate: Date, toDate: Date) => Promise<ExcelJS.Buffer>;
