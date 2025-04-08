import { GetReportDto } from '../../dtos/adminDtos/report.dto';
export declare class ReportService {
    private orderService;
    private purchaseService;
    private getProfitReportExcel;
    getReportExcel(getData: GetReportDto): Promise<any>;
}
