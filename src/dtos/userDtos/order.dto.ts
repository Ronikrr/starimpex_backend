import { ID_REGEX } from '@/utils/regex';
import { ArrayMinSize, IsArray, IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class CreateOrderDto {
  @Matches(ID_REGEX, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  items: Array<string>;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsBoolean()
  isTermsAccepted: boolean;
}
