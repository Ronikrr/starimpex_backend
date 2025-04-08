import { ESupportRequestStatus } from '@/interfaces/support.interface';
import { ID_REGEX } from '@/utils/regex';
import { IsEnum, IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class GetContactListDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;

  @IsString()
  @IsOptional()
  public search: string;

  @IsEnum(ESupportRequestStatus)
  @IsString()
  @IsOptional()
  public status: string;
}

export class GetInquiryListDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;

  @IsString()
  @IsOptional()
  public search: string;

  @IsEnum(ESupportRequestStatus)
  @IsString()
  @IsOptional()
  public status: string;
}

export class GetHelpSupportListDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;

  @Matches(ID_REGEX)
  @IsOptional()
  public user: string;

  @IsEnum(ESupportRequestStatus)
  @IsString()
  @IsOptional()
  public status: string;
}

export class GetFeedbackListDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;

  @Matches(ID_REGEX)
  @IsOptional()
  public user: string;
}

export class ChangeSupportRequestStatusDto {
  @IsEnum(ESupportRequestStatus)
  @IsString()
  public status: string;
}
