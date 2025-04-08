import { EDiamondEyeClean, EDiamondType } from '@/interfaces/diamonds.interface';
import {
  ArrayMinSize,
  IsArray,
  IsBooleanString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IsStringQueryArray, IsStringQueryArrayNumberRangeObject } from '../decorators/is.string.array.decorator';
import { IsStringQueryObjectNumberRange, IsStringQueryObjectSortOrder } from '../decorators/is.string.object.decorator';
import { ID_REGEX } from '@/utils/regex';
import { Type } from 'class-transformer';

export class NumberRangeOption {
  @IsNumber()
  @IsOptional()
  from: number;

  @IsNumber()
  @IsOptional()
  to: number;
}

export class GetDiamondListDto {
  @IsEnum(EDiamondType)
  @IsOptional()
  public diamondType: string;

  @IsStringQueryArray()
  @IsOptional()
  public shapeList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public labList: Array<string>;

  @IsStringQueryArrayNumberRangeObject()
  @IsOptional()
  public caratWeightList: NumberRangeOption[];

  @IsStringQueryArray()
  @IsOptional()
  public colorList: Array<string>;

  @IsBooleanString()
  @IsNotEmpty()
  @IsOptional()
  public noBGM: boolean;

  @IsBooleanString()
  @IsNotEmpty()
  @IsOptional()
  public isFancyColor: boolean;

  @IsStringQueryArray()
  @IsOptional()
  public fancyColorList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public fancyIntensityList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public fancyOvertoneList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public clarityList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public cutList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public polishList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public symmetryList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public florescenceList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public countryList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public eyeCleanList: EDiamondEyeClean[];

  @IsStringQueryArray()
  @IsOptional()
  public typeList: Array<string>;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public discountRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public pricePerCaratRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public totalPriceRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public tablePercentageRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public depthPercentageRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public lengthRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public widthRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public ratioRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public crownHeightRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public crownAngleRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public pavilionHeightRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public pavilionAngleRange: NumberRangeOption;

  @IsStringQueryObjectNumberRange()
  @IsOptional()
  public girdlePercentageRange: NumberRangeOption;

  @IsStringQueryArray()
  @IsOptional()
  public culetSizeList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public keyToSymbolIncludeList: Array<string>;

  @IsStringQueryArray()
  @IsOptional()
  public keyToSymbolExcludeList: Array<string>;

  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;

  @IsString()
  @IsOptional()
  public stoneIds: string;

  @IsStringQueryObjectSortOrder()
  @IsOptional()
  public sortOrder: object;
}

export class DiamondNotes {
  @Matches(ID_REGEX)
  @IsString()
  public diamondId: string;

  @IsString()
  public notes: string;
}

export class AddDiamondNotes {
  @ValidateNested({ each: true })
  @Type(() => DiamondNotes)
  @ArrayMinSize(1)
  @IsArray()
  public diamondNotes: Array<DiamondNotes>;
}

export class SaveDiamondSearchDto {
  @IsObject()
  @IsNotEmptyObject()
  public filters: object;
}

export class ExportExcelDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  public diamondIds: string;
}

export class SendExcelMailDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  public diamondIds: string;

  @IsEmail()
  public email: string;
}
