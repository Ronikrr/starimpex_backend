export declare class PartialOrderItemStatus {
    itemId: string;
    isConfirmed: boolean;
}
export declare class ChangeOrderStatusDto {
    status: string;
    items: Array<PartialOrderItemStatus>;
}
declare class OtherChargeDto {
    amount: number;
    description: string;
}
export declare class OrderAdditionChargesDto {
    shippingCharge: number;
    additionalCharges: Array<OtherChargeDto>;
}
export declare class OrderItemDto {
    stoneNo: string;
    lab: string;
    shape: string;
    type: string;
    rap: number;
    ourDiscount: number;
    pricePerCarat: number;
    ourPrice: number;
    caratWeight: number;
}
export declare class CreateManualOrderDto {
    orderDate: Date;
    companyName: string;
    companyEmail: string;
    description: string;
    orderItems: OrderItemDto[];
}
export {};
