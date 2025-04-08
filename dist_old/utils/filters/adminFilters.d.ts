/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { DiamondSource } from '../../models/diamondSources.model';
import { Order } from '../../models/order.model';
import { Purchase } from '../../models/purchase.model';
import { User } from '../../models/users.model';
export declare const filterUserProjection: {
    _id: number;
    fullName: number;
    firstName: number;
    lastName: number;
    companyName: number;
    address: number;
    state: number;
    city: number;
    country: number;
    mobileNumber: number;
    telephoneNumber: number;
    email: number;
    messengerType: number;
    messengerIdNumber: number;
    website: number;
    notes: number;
    status: number;
    createdAt: number;
    updatedAt: number;
};
export declare const filterUserBasicDetailsProjection: {
    _id: number;
    fullName: number;
    firstName: number;
    lastName: number;
    companyName: number;
    email: number;
    mobileNumber: number;
};
export declare const filterUser: (user: User) => {
    _id: import("mongoose").Schema.Types.ObjectId;
    fullName: string;
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    state: string;
    city: string;
    country: string;
    mobileNumber: string;
    telephoneNumber: string;
    email: string;
    messengerType: string;
    messengerIdNumber: string;
    website: string;
    notes: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const filterDiamondSourceProjection: {
    sourceType: number;
    isDisabled: number;
    markupPercentage: number;
};
export declare const filterDiamondSource: (diamondSource: DiamondSource) => {
    sourceType: string;
    isDisabled: boolean;
    markupPercentage: number;
};
export declare const filterOrder: (order: Order) => {
    _id: import("mongoose").Schema.Types.ObjectId;
    orderNumber: string;
    items: import("../../interfaces/order.interface").IOrderItem[];
    remarks: string;
    user: import("@typegoose/typegoose").Ref<User, import("mongoose").Types.ObjectId>;
    status: string;
    shippingCharge: number;
    additionalCharges: import("../../interfaces/order.interface").IOrderAdditionalCharge[];
    grossAmount: number;
    totalStones: number;
    totalCarats: number;
    isTermsAccepted: boolean;
    createdAt: Date;
    isManualOrder: boolean;
    companyEmail: string;
    companyName: string;
    description: string;
};
export declare const filterUserCartHistoryProjection: {
    stoneNos: number;
    user: number;
    createdAt: number;
};
export declare const filterUserPriceTrackHistoryProjection: {
    stoneNos: number;
    user: number;
    createdAt: number;
};
export declare const filterPurchaseProjection: {
    _id: number;
    orderId: number;
    date: number;
    supplierName: number;
    supplierAddress: number;
    description: number;
    items: number;
};
export declare const filterPurchase: (purchase: Purchase) => {
    _id: import("mongoose").Schema.Types.ObjectId;
    orderId: string;
    date: Date;
    supplierName: string;
    supplierAddress: string;
    description: string;
    items: object[];
};
