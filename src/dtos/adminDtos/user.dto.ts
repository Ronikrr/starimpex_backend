import { EUserStatus } from '@/interfaces/users.interface';
import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class GetUserListDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;
}

export class ChangeUserStatusDto {
  @IsEnum(EUserStatus)
  public status: string;
}

export class GetCartHistoryListDto {
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

export class GetPriceTrackHistoryListDto {
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

export class ChangeUserPasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(13)
  public password: string;
}
