import ExcelJS from 'exceljs';
export declare class DiamondService {
    private validateUploadedDiamondsFile;
    private convertExcelToArray;
    uploadViaFile(file: any): Promise<void>;
    getDiamondUploadFile(): Promise<ExcelJS.Buffer>;
}
