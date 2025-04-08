import { Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { User } from './users.model';
import { EDiamondEyeClean, EDiamondType } from '../interfaces/diamonds.interface';
export declare class SearchHistory {
    _id: Schema.Types.ObjectId;
    user: Ref<User>;
    filters: {
        diamondType: EDiamondType;
        shapeList?: string[];
        noBGM?: boolean;
        labList?: string[];
        caratWeightList?: Array<{
            from?: number;
            to?: number;
        }>;
        colorList?: string[];
        fancyColorList?: string[];
        fancyIntensityList?: string[];
        fancyOvertoneList?: string[];
        clarityList?: string[];
        cutList?: string[];
        polishList?: string[];
        symmetryList?: string[];
        florescenceList?: string[];
        countryList?: string[];
        eyeCleanList?: EDiamondEyeClean[];
        typeList?: string[];
        discountRange?: {
            from?: number;
            to?: number;
        };
        pricePerCaratRange?: {
            from?: number;
            to?: number;
        };
        totalPriceRange?: {
            from?: number;
            to?: number;
        };
        tablePercentageRange?: {
            from?: number;
            to?: number;
        };
        depthPercentageRange?: {
            from?: number;
            to?: number;
        };
        lengthRange?: {
            from?: number;
            to?: number;
        };
        widthRange?: {
            from?: number;
            to?: number;
        };
        ratioRange?: {
            from?: number;
            to?: number;
        };
        crownHeightRange?: {
            from?: number;
            to?: number;
        };
        crownAngleRange?: {
            from?: number;
            to?: number;
        };
        pavilionHeightRange?: {
            from?: number;
            to?: number;
        };
        pavilionAngleRange?: {
            from?: number;
            to?: number;
        };
        girdlePercentageRange?: {
            from?: number;
            to?: number;
        };
        culetSizeList?: string[];
        keyToSymbolIncludeList?: string[];
        keyToSymbolExcludeList?: string[];
    };
    totalStones: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const SearchHistoryModel: import("@typegoose/typegoose").ReturnModelType<typeof SearchHistory, import("@typegoose/typegoose/lib/types").BeAnObject>;
