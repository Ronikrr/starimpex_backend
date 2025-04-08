import { EMessengerType } from '@/interfaces/users.interface';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  public firstName: string;

  @IsString()
  @MaxLength(100)
  @MinLength(2)
  public lastName: string;

  @IsString()
  @MaxLength(100)
  @MinLength(2)
  public companyName: string;

  @IsString()
  @MaxLength(100)
  @MinLength(2)
  public address: string;

  @IsString()
  @MaxLength(50)
  @MinLength(2)
  public state: string;

  @IsString()
  @MaxLength(50)
  @MinLength(2)
  public city: string;

  @IsString()
  @MaxLength(60)
  @MinLength(2)
  public country: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public telephoneNumber: string;

  @IsEnum(EMessengerType)
  @IsString()
  @IsOptional()
  public messengerType: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public messengerIdNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public website: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public notes: string;
}
