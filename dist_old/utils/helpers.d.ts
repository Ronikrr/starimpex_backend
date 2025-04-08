import { EDiamondEyeClean } from '../interfaces/diamonds.interface';
import { EFormatterType } from '../interfaces/export.interface';
export declare const roundFloatValues: (value: number, precision: number) => number;
export declare const calculateOurPrice: (netAmount: number, markup: number) => number;
export declare const calculateOurDiscount: (ourPrice: number, rapRate: number, weight: number) => number;
export declare const calculatePricePerCarat: (ourPrice: number, weight: number) => number;
export declare const getEyeCleanCondition: (eyeClean: EDiamondEyeClean) => {
    $eq: number;
    $gt?: undefined;
    $lt?: undefined;
    $lte?: undefined;
} | {
    $gt: number;
    $lt: number;
    $eq?: undefined;
    $lte?: undefined;
} | {
    $gt: number;
    $lte: number;
    $eq?: undefined;
    $lt?: undefined;
} | {
    $lte: number;
    $eq?: undefined;
    $gt?: undefined;
    $lt?: undefined;
};
export declare const formatDate: (date: Date) => string;
export declare const getEyeCleanValue: (eyeClean: number) => EDiamondEyeClean;
export declare const formatValue: (value: any, formatterType: EFormatterType, searchValue?: string, newValue?: string, webURL?: string, getValue?: (...args: any) => any) => any;
export declare const formatDiamondToExcelData: (diamonds: Array<any>) => Array<any>;
export declare const formatOrderToExcelData: (diamonds: Array<any>) => Array<any>;
export declare const formatPurchaseToExcelData: (diamonds: Array<any>) => Array<any>;
export declare const formatProfitToExcelData: (diamonds: Array<any>) => Array<any>;
export declare const calculateRatioByShape: (shape: string, width: number, length: number) => number;
export declare const isEmpty: (value: string | number | object) => boolean;
