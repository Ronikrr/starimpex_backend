export declare class GetOrderListDto {
    skip: number;
    limit: number;
    orderNumber: string;
    fromOrderDate: Date;
    toOrderDate: Date;
    fromAmount: number;
    toAmount: number;
    fromTotalItems: number;
    toTotalItems: number;
    fromCarats: number;
    toCarats: number;
}
export declare class ExportOrdersExcelDto {
    orderIds: Array<string>;
}
