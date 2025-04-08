export declare class PurchaseItem {
    stoneId: string;
    finalRap: number;
    finalDiscount: number;
    finalPrice: number;
    finalTotalPrice: number;
}
export declare class CreatePurchaseDto {
    orderId: string;
    date: Date;
    supplierName: string;
    supplierAddress: string;
    description: string;
    items: PurchaseItem[];
}
export declare class UpdatePurchaseDto {
    orderId: string;
    date: Date;
    supplierName: string;
    supplierAddress: string;
    description: string;
    items: PurchaseItem[];
}
export declare class GetPurchaseListDto {
    skip: number;
    limit: number;
    fromDate: Date;
    toDate: Date;
    orderId: string;
}
export declare class ExportPurchasesExcelDto {
    purchaseIds: Array<string>;
}
