export declare class GetContactListDto {
    skip: number;
    limit: number;
    search: string;
    status: string;
}
export declare class GetInquiryListDto {
    skip: number;
    limit: number;
    search: string;
    status: string;
}
export declare class GetHelpSupportListDto {
    skip: number;
    limit: number;
    user: string;
    status: string;
}
export declare class GetFeedbackListDto {
    skip: number;
    limit: number;
    user: string;
}
export declare class ChangeSupportRequestStatusDto {
    status: string;
}
