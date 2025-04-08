import { EReportType } from '@/interfaces/adminInterfaces/report.interface';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

export class GetReportDto {
  @IsEnum(EReportType)
  @IsNotEmpty()
  public reportType: string;

  @IsDateString()
  public fromDate: Date;

  @IsDateString()
  public toDate: Date;
}
