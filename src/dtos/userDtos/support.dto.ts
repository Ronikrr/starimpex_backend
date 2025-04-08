import { EOptionDiamondType } from '@/interfaces/userInterfaces/support.interface';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class ContactUsDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  @IsOptional()
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  public country: string;

  @IsString()
  public message: string;
}

export class InquiryDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  @IsOptional()
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public companyName: string;

  @IsString()
  @IsEnum(EOptionDiamondType)
  @IsOptional()
  public diamondType: string;

  @IsString()
  public country: string;

  @IsString()
  public message: string;
}

export class FeedbackDto {
  @Max(5)
  @Min(1)
  @IsNumber()
  public rating: number;

  @IsString()
  @IsOptional()
  public comment: string;
}

export class HelpSupportDto {
  @IsString()
  @IsNotEmpty()
  public message: string;
}
