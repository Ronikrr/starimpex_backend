import { ESourceType } from '@/interfaces/diamonds.interface';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export class EnableDisableSourceDto {
  @IsString()
  @IsEnum(ESourceType)
  public sourceType: string;

  @IsBoolean()
  public isDisabled: boolean;
}

export class UpdateMarkupPercentageDto {
  @IsNumber()
  public markupPercentage: number;

  @IsString()
  @IsEnum(ESourceType)
  public sourceType: string;
}
