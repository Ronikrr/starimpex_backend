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
import { Diamond } from '../../models/diamonds.model';
import { Order } from '../../models/order.model';
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
    token: number;
    createdAt: number;
    updatedAt: number;
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
    token: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const filterDiamondProjection: {
    _id: number;
    diamondType: number;
    stoneNo: number;
    lab: number;
    inscription: number;
    shape: number;
    caratWeight: number;
    pricePerCarat: number;
    color: number;
    fancyColor: number;
    fancyIntensity: number;
    fancyOvertone: number;
    noBGM: number;
    clarity: number;
    cut: number;
    polish: number;
    symmetry: number;
    florescence: number;
    type: number;
    country: number;
    state: number;
    city: number;
    region: number;
    shade: number;
    luster: number;
    eyeClean: number;
    milky: number;
    inclusion: number;
    extraFacet: number;
    internalGraining: number;
    surfaceGraining: number;
    heartsAndArrows: number;
    measurement: number;
    length: number;
    width: number;
    height: number;
    depthPercentage: number;
    tablePercentage: number;
    crownAngle: number;
    crownHeight: number;
    pavilionAngle: number;
    pavilionHeight: number;
    starLength: number;
    lowerHalves: number;
    girdleType: number;
    girdlePercentage: number;
    culetSize: number;
    ratio: number;
    notes: number;
    videoLink: number;
    imageLink: number;
    certificateLink: number;
    certificateComment: number;
    motibaGemsComment: number;
    rap: number;
    ourPrice: number;
    ourDiscount: number;
    keyToSymbol: number;
    status: number;
};
export declare const filterDiamond: (diamond: Diamond | any) => {
    _id: any;
    diamondType: any;
    stoneNo: any;
    lab: any;
    inscription: any;
    shape: any;
    caratWeight: any;
    pricePerCarat: any;
    color: any;
    fancyColor: any;
    fancyIntensity: any;
    fancyOvertone: any;
    noBGM: any;
    clarity: any;
    cut: any;
    polish: any;
    symmetry: any;
    florescence: any;
    type: any;
    country: any;
    state: any;
    city: any;
    region: any;
    shade: any;
    luster: any;
    eyeClean: any;
    milky: any;
    inclusion: any;
    extraFacet: any;
    internalGraining: any;
    surfaceGraining: any;
    heartsAndArrows: any;
    measurement: any;
    length: any;
    width: any;
    height: any;
    depthPercentage: any;
    tablePercentage: any;
    crownAngle: any;
    crownHeight: any;
    pavilionAngle: any;
    pavilionHeight: any;
    starLength: any;
    lowerHalves: any;
    girdleType: any;
    girdlePercentage: any;
    culetSize: any;
    ratio: any;
    notes: any;
    videoLink: any;
    imageLink: any;
    certificateLink: any;
    certificateComment: any;
    motibaGemsComment: any;
    rap: any;
    ourPrice: any;
    ourDiscount: any;
    keyToSymbol: any;
    status: any;
};
export declare const filterCartProjection: {
    diamond: number;
    diamondSnapshot: number;
    status: number;
};
export declare const filterOrder: (order: Order, otherData: any) => any;
export declare const filterSearchHistoryProjection: {
    _id: number;
    filters: number;
    totalStones: number;
    createdAt: number;
};
export declare const filterPriceTrackerProjection: {
    diamondSnapshot: number;
    status: number;
};
