import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class GetSearchListDto {
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
}
