import { ContactUsDto, FeedbackDto, HelpSupportDto, InquiryDto } from '@/dtos/userDtos/support.dto';
import { ContactModel } from '@/models/contact.model';
import { CustomerQueryModel } from '@/models/customerQuery.model';
import { FeedbackModel } from '@/models/feedback.model';
import { InquiryModel } from '@/models/inquiry.model';
import { User } from '@/models/users.model';
import { sendContactUsMail, sendInquiryMail } from '@/utils/mailer';
import { Service } from 'typedi';

@Service()
export class CustomerSupportService {
  public contactUs = async (data: ContactUsDto) => {
    const contactCreated = await ContactModel.create({
      firstName: data.firstName.toLowerCase(),
      lastName: data.lastName.toLowerCase(),
      phone: data.phone,
      email: data.email.toLowerCase(),
      country: data.country.toLowerCase(),
      message: data.message,
    });

    sendContactUsMail(contactCreated);
  };

  public inquiry = async (data: InquiryDto) => {
    const inquiryCreated = await InquiryModel.create({
      firstName: data.firstName.toLowerCase(),
      lastName: data.lastName.toLowerCase(),
      phone: data.phone,
      email: data.email.toLowerCase(),
      companyName: data.companyName ? data.companyName.toLowerCase() : null,
      diamondType: data.diamondType,
      country: data.country.toLowerCase(),
      message: data.message,
    });

    sendInquiryMail(inquiryCreated);
  };

  public feedback = async (data: FeedbackDto, user: User) => {
    await FeedbackModel.create({
      rating: data.rating,
      comment: data.comment,
      user: user._id,
    });
  };

  public helpSupport = async (data: HelpSupportDto, user: User) => {
    await CustomerQueryModel.create({
      message: data.message,
      user: user._id,
    });
  };
}
