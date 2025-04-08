export declare class DashboardService {
    getDashboardStats(): Promise<{
        totalApprovedUser: number;
        totalInquiries: number;
        totalSearches: number;
        totalNaturalDiamonds: number;
        totalLabGrownDiamonds: number;
    }>;
}
