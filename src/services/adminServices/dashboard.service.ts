import { EDiamondType } from '@/interfaces/diamonds.interface';
import { EUserStatus } from '@/interfaces/users.interface';
import { DiamondModel } from '@/models/diamonds.model';
import { InquiryModel } from '@/models/inquiry.model';
import { SearchHistoryModel } from '@/models/searchHistory.model';
import { UserModel } from '@/models/users.model';
import { Service } from 'typedi';

@Service()
export class DashboardService {
  public async getDashboardStats(): Promise<{
    totalApprovedUser: number;
    totalInquiries: number;
    totalSearches: number;
    totalNaturalDiamonds: number;
    totalLabGrownDiamonds: number;
  }> {
    const totalApprovedUser = await UserModel.countDocuments({ status: EUserStatus.APPROVED });
    const totalInquiries = await InquiryModel.countDocuments({});
    const totalNaturalDiamonds = await DiamondModel.countDocuments({ diamondType: EDiamondType.NATURAL_DIAMONDS, isDeleted: false });
    const totalLabGrownDiamonds = await DiamondModel.countDocuments({ diamondType: EDiamondType.LAB_GROWN_DIAMONDS, isDeleted: false });
    const totalSearches = await SearchHistoryModel.countDocuments();

    return {
      totalNaturalDiamonds,
      totalLabGrownDiamonds,
      totalApprovedUser,
      totalInquiries,
      totalSearches,
    };
  }
}
