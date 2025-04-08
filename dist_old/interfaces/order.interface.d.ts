import { Schema } from 'mongoose';
export declare enum EOrderStatus {
    PENDING = "pending",
    CONFIRM = "confirm",
    PARTIALLY_CONFIRM = "partially_confirm",
    CANCELED = "canceled"
}
export declare enum EOrderItemStatus {
    PENDING = "pending",
    CONFIRM = "confirm",
    NOT_CONFIRM = "not_confirm"
}
export interface IOrderAdditionalCharge {
    amount: number;
    description: string;
}
export interface IOrderItem {
    _id: Schema.Types.ObjectId;
    uniqueStoneId: string;
    diamondType: string;
    stoneNo: string;
    source: string;
    lab: string;
    inscription: string;
    shape: string;
    caratWeight: number;
    pricePerCarat: number;
    color: string;
    fancyColor: string;
    fancyIntensity: string;
    fancyOvertone: string;
    noBGM: boolean;
    clarity: string;
    cut: string;
    polish: string;
    symmetry: string;
    florescence: string;
    type: string;
    country: string;
    state: string;
    city: string;
    region: string;
    shade: string;
    luster: string;
    eyeClean: number;
    milky: string;
    inclusion: string;
    extraFacet: string;
    internalGraining: string;
    surfaceGraining: string;
    heartsAndArrows: boolean;
    measurement: string;
    length: number;
    width: number;
    height: number;
    depthPercentage: number;
    tablePercentage: number;
    crownAngle: number;
    crownHeight: number;
    pavilionAngle: number;
    pavilionHeight: number;
    starLength: string;
    lowerHalves: string;
    girdleType: string;
    girdlePercentage: number;
    culetSize: string;
    ratio: number;
    notes: string;
    videoLink: string;
    imageLink: string;
    certificateLink: string;
    certificateComment: string;
    motibaGemsComment: string;
    rap: number;
    ourPrice: number;
    ourDiscount: number;
    metadata: object;
    isDeleted: boolean;
    keyToSymbol: string[] | null;
    status: string;
    confirmationStatus: EOrderItemStatus;
}
