import { EOrderStatus } from '@/interfaces/order.interface';
import { ID_REGEX } from '@/utils/regex';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class PartialOrderItemStatus {
  @Matches(ID_REGEX)
  public itemId: string;

  @IsBoolean()
  public isConfirmed: boolean;
}

export class ChangeOrderStatusDto {
  @IsEnum(EOrderStatus)
  @IsNotEmpty()
  @IsString()
  public status: string;

  @ValidateNested({ each: true })
  @Type(() => PartialOrderItemStatus)
  @ArrayMinSize(1)
  @IsArray()
  @ValidateIf(o => o.status === EOrderStatus.PARTIALLY_CONFIRM)
  public items: Array<PartialOrderItemStatus>;
}

class OtherChargeDto {
  @IsNumber()
  public amount: number;

  @IsString()
  public description: string;
}

export class OrderAdditionChargesDto {
  @IsNumber()
  public shippingCharge: number;

  @ValidateNested({ each: true })
  @Type(() => OtherChargeDto)
  @IsOptional()
  public additionalCharges: Array<OtherChargeDto>;
}

export class OrderItemDto {
  @IsString()
  public stoneNo: string;

  @IsString()
  @IsOptional()
  public lab: string;

  @IsString()
  @IsOptional()
  public shape: string;

  @IsString()
  @IsOptional()
  public type: string;

  @IsNumber()
  public rap: number;

  @IsNumber()
  public ourDiscount: number;

  @IsNumber()
  public pricePerCarat: number;

  @IsNumber()
  public ourPrice: number;

  @IsNumber()
  public caratWeight: number;
}

export class CreateManualOrderDto {
  @IsDateString()
  orderDate: Date;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  companyEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @ArrayMinSize(1)
  @IsArray()
  orderItems: OrderItemDto[];
}
