import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsOptional()
  public fcmToken: string;
}

export class LogoutDto {
  @IsString()
  @IsOptional()
  public fcmToken: string;
}
