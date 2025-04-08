import { ID_REGEX } from '@/utils/regex';
import { ArrayNotEmpty, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class AddToPriceTrackerDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  diamondIds: string[];
}

export class GetPriceTrackListDto {
  @IsOptional()
  @IsNumberString()
  public skip: number;

  @IsOptional()
  @IsNumberString()
  public limit: number;
}

export class RemoveFromPriceTrackerDto {
  @Matches(ID_REGEX, { each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  diamondIds: string[];
}
