import { ID_REGEX } from '@/utils/regex';
import { ArrayMinSize, IsDateString, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class GetOrderListDto {
  @IsOptional()
  @IsNumberString()
  public skip: number;

  @IsOptional()
  @IsNumberString()
  public limit: number;

  @IsString()
  @IsOptional()
  public orderNumber: string;

  @IsDateString()
  @IsOptional()
  public fromOrderDate: Date;

  @IsDateString()
  @IsOptional()
  public toOrderDate: Date;

  @IsNumberString()
  @IsOptional()
  public fromAmount: number;

  @IsNumberString()
  @IsOptional()
  public toAmount: number;

  @IsNumberString()
  @IsOptional()
  public fromTotalItems: number;

  @IsNumberString()
  @IsOptional()
  public toTotalItems: number;

  @IsNumberString()
  @IsOptional()
  public fromCarats: number;

  @IsNumberString()
  @IsOptional()
  public toCarats: number;
}

export class ExportOrdersExcelDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  public orderIds: Array<string>;
}
