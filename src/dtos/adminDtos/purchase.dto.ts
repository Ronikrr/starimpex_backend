import { ID_REGEX } from '@/utils/regex';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class PurchaseItem {
  @IsString()
  public stoneId: string;

  @IsNumber()
  public finalRap: number;

  @IsNumber()
  public finalDiscount: number;

  @IsNumber()
  public finalPrice: number;

  @IsNumber()
  public finalTotalPrice: number;
}

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  public orderId: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public supplierName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public supplierAddress: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description: string;

  @ValidateNested({ each: true })
  @Type(() => PurchaseItem)
  @ArrayMinSize(1)
  @IsArray()
  public items: PurchaseItem[];
}

export class UpdatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  public orderId: string;

  @IsDateString()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public supplierName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public supplierAddress: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description: string;

  @ValidateNested({ each: true })
  @Type(() => PurchaseItem)
  @ArrayMinSize(1)
  @IsArray()
  public items: PurchaseItem[];
}

export class GetPurchaseListDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;

  @IsDateString()
  @IsOptional()
  public fromDate: Date;

  @IsDateString()
  @IsOptional()
  public toDate: Date;

  @IsString()
  @IsOptional()
  public orderId: string;
}

export class ExportPurchasesExcelDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  public purchaseIds: Array<string>;
}
