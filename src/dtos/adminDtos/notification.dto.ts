import { IsNumberString, IsOptional } from 'class-validator';

export class GetNotificationDto {
  @IsNumberString()
  @IsOptional()
  public skip: number;

  @IsNumberString()
  @IsOptional()
  public limit: number;
}
