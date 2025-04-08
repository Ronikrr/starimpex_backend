import { EMessengerType } from '@/interfaces/users.interface';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
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

  @IsEmail()
  public email: string;

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
  @MaxLength(13)
  @MinLength(8)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public notes: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  @MinLength(8)
  public password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  public email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public hash: string;
}
