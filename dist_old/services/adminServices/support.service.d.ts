import { ChangeSupportRequestStatusDto, GetContactListDto, GetFeedbackListDto, GetHelpSupportListDto, GetInquiryListDto } from '../../dtos/adminDtos/support.dto';
import { Contact } from '../../models/contact.model';
import { CustomerQuery } from '../../models/customerQuery.model';
import { Feedback } from '../../models/feedback.model';
import { Inquiry } from '../../models/inquiry.model';
export declare class SupportService {
    getContactList(getData: GetContactListDto): Promise<{
        contacts: Contact[];
        totalPages: number;
    }>;
    getInquiryList(getData: GetInquiryListDto): Promise<{
        inquires: Inquiry[];
        totalPages: number;
    }>;
    getFeedbackList(getData: GetFeedbackListDto): Promise<{
        feedbacks: Feedback[];
        totalPages: number;
    }>;
    getHelpSupportList(getData: GetHelpSupportListDto): Promise<{
        queries: CustomerQuery[];
        totalPages: number;
    }>;
    changeContactStatus(data: ChangeSupportRequestStatusDto, id: string): Promise<void>;
    changeInquiryStatus(data: ChangeSupportRequestStatusDto, id: string): Promise<void>;
    changeHelpSupportStatus(data: ChangeSupportRequestStatusDto, id: string): Promise<void>;
}
