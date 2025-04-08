import { EDiamondEyeClean } from '../../interfaces/diamonds.interface';
export declare class NumberRangeOption {
    from: number;
    to: number;
}
export declare class GetDiamondListDto {
    diamondType: string;
    shapeList: Array<string>;
    labList: Array<string>;
    caratWeightList: NumberRangeOption[];
    colorList: Array<string>;
    noBGM: boolean;
    isFancyColor: boolean;
    fancyColorList: Array<string>;
    fancyIntensityList: Array<string>;
    fancyOvertoneList: Array<string>;
    clarityList: Array<string>;
    cutList: Array<string>;
    polishList: Array<string>;
    symmetryList: Array<string>;
    florescenceList: Array<string>;
    countryList: Array<string>;
    eyeCleanList: EDiamondEyeClean[];
    typeList: Array<string>;
    discountRange: NumberRangeOption;
    pricePerCaratRange: NumberRangeOption;
    totalPriceRange: NumberRangeOption;
    tablePercentageRange: NumberRangeOption;
    depthPercentageRange: NumberRangeOption;
    lengthRange: NumberRangeOption;
    widthRange: NumberRangeOption;
    ratioRange: NumberRangeOption;
    crownHeightRange: NumberRangeOption;
    crownAngleRange: NumberRangeOption;
    pavilionHeightRange: NumberRangeOption;
    pavilionAngleRange: NumberRangeOption;
    girdlePercentageRange: NumberRangeOption;
    culetSizeList: Array<string>;
    keyToSymbolIncludeList: Array<string>;
    keyToSymbolExcludeList: Array<string>;
    skip: number;
    limit: number;
    stoneIds: string;
    sortOrder: object;
}
export declare class DiamondNotes {
    diamondId: string;
    notes: string;
}
export declare class AddDiamondNotes {
    diamondNotes: Array<DiamondNotes>;
}
export declare class SaveDiamondSearchDto {
    filters: object;
}
export declare class ExportExcelDto {
    diamondIds: string;
}
export declare class SendExcelMailDto {
    diamondIds: string;
    email: string;
}
