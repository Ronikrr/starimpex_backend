import { ID_REGEX } from '@/utils/regex';
import { ArrayNotEmpty, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class GetCartItemListDto {
  @IsOptional()
  @IsNumberString()
  public skip: number;

  @IsOptional()
  @IsNumberString()
  public limit: number;
}

export class AddToCartDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  public itemIds: string[];
}

export class DeleteFromCartDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  public itemIds: string[];
}
