import { GetDiamondListDto, SendExcelMailDto } from '../dtos/userDtos/diamond.dto';
import { Diamond } from '../models/diamonds.model';
import { User } from '../models/users.model';
export declare class DiamondService {
    getDiamondList(getData: GetDiamondListDto, user?: User): Promise<{
        totalPages: number;
        totalCount: number;
        diamonds: Diamond[];
    }>;
    getDiamond(diamondId: string): Promise<Diamond>;
    exportDiamondsToExcel(diamondIds: string[]): Promise<import("exceljs").Buffer>;
    sendDiamondExcelMail(data: SendExcelMailDto): Promise<void>;
    getCertificate(diamondId: string): Promise<{
        certificateLink: string;
    }>;
    getVideo(diamondId: string): Promise<{
        videoLink: string;
    }>;
}
