import { CreatePurchaseDto, GetPurchaseListDto, UpdatePurchaseDto } from '../../dtos/adminDtos/purchase.dto';
import { Purchase } from '../../models/purchase.model';
export declare class PurchaseService {
    createPurchase(data: CreatePurchaseDto): Promise<Purchase>;
    updatePurchase(data: UpdatePurchaseDto, purchaseId: string): Promise<Purchase>;
    getPurchaseList(getData: GetPurchaseListDto): Promise<{
        purchases: Purchase[];
        totalPages: number;
        totalCount: number;
    }>;
    deletePurchase(purchaseId: string): Promise<void>;
    exportPurchasesExcel(purchaseIds: Array<string>, fromDate?: Date, toDate?: Date): Promise<import("exceljs").Buffer>;
    getPurchaseDetails(purchaseId: string): Promise<{
        purchase: Purchase;
        otherDetails: any;
    }>;
}
