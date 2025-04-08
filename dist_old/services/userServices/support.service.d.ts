import { ContactUsDto, FeedbackDto, HelpSupportDto, InquiryDto } from '../../dtos/userDtos/support.dto';
import { User } from '../../models/users.model';
export declare class CustomerSupportService {
    contactUs: (data: ContactUsDto) => Promise<void>;
    inquiry: (data: InquiryDto) => Promise<void>;
    feedback: (data: FeedbackDto, user: User) => Promise<void>;
    helpSupport: (data: HelpSupportDto, user: User) => Promise<void>;
}
