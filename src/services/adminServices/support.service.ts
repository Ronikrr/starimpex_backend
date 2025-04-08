import {
  ChangeSupportRequestStatusDto,
  GetContactListDto,
  GetFeedbackListDto,
  GetHelpSupportListDto,
  GetInquiryListDto,
} from '@/dtos/adminDtos/support.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Contact, ContactModel } from '@/models/contact.model';
import { CustomerQuery, CustomerQueryModel } from '@/models/customerQuery.model';
import { Feedback, FeedbackModel } from '@/models/feedback.model';
import { Inquiry, InquiryModel } from '@/models/inquiry.model';
import { CODE_NOT_FOUND } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { filterUserProjection } from '@/utils/filters/adminFilters';
import { Service } from 'typedi';

@Service()
export class SupportService {
  public async getContactList(getData: GetContactListDto): Promise<{ contacts: Contact[]; totalPages: number }> {
    const findCondition: any = {};
    if (getData.status) {
      findCondition.status = getData.status;
    }
    if (getData.search) {
      findCondition.$text = { $search: getData.search };
    }

    const totalCount = await ContactModel.countDocuments(findCondition);

    if (!totalCount) {
      return {
        contacts: [],
        totalPages: 0,
      };
    }

    const contacts = await ContactModel.find(findCondition).sort({ updatedAt: -1 }).skip(getData.skip).limit(getData.limit);

    return {
      contacts,
      totalPages: Math.ceil(totalCount / getData.limit),
    };
  }

  public async getInquiryList(getData: GetInquiryListDto): Promise<{ inquires: Inquiry[]; totalPages: number }> {
    const findCondition: any = {};
    if (getData.status) {
      findCondition.status = getData.status;
    }
    if (getData.search) {
      findCondition.$text = { $search: getData.search };
    }

    const totalCount = await InquiryModel.countDocuments(findCondition);

    if (!totalCount) {
      return {
        inquires: [],
        totalPages: 0,
      };
    }

    const inquires = await InquiryModel.find(findCondition).sort({ updatedAt: -1 }).skip(getData.skip).limit(getData.limit);

    return {
      inquires,
      totalPages: Math.ceil(totalCount / getData.limit),
    };
  }

  public async getFeedbackList(getData: GetFeedbackListDto): Promise<{ feedbacks: Feedback[]; totalPages: number }> {
    const findCondition: any = {};
    if (getData.user) {
      findCondition.user = getData.user;
    }

    const totalCount = await FeedbackModel.countDocuments(findCondition);

    if (!totalCount) {
      return {
        feedbacks: [],
        totalPages: 0,
      };
    }

    const feedbacks = await FeedbackModel.find(findCondition)
      .populate('user', filterUserProjection)
      .sort({ createdAt: -1 })
      .skip(getData.skip)
      .limit(getData.limit);

    return {
      feedbacks,
      totalPages: Math.ceil(totalCount / getData.limit),
    };
  }

  public async getHelpSupportList(getData: GetHelpSupportListDto): Promise<{ queries: CustomerQuery[]; totalPages: number }> {
    const findCondition: any = {};
    if (getData.status) {
      findCondition.status = getData.status;
    }
    if (getData.user) {
      findCondition.user = getData.user;
    }

    const totalCount = await CustomerQueryModel.countDocuments(findCondition);
    if (!totalCount) {
      return {
        queries: [],
        totalPages: 0,
      };
    }

    const queries = await CustomerQueryModel.find(findCondition)
      .populate('user', filterUserProjection)
      .sort({ updatedAt: -1 })
      .skip(getData.skip)
      .limit(getData.limit);

    return {
      queries,
      totalPages: Math.ceil(totalCount / getData.limit),
    };
  }

  public async changeContactStatus(data: ChangeSupportRequestStatusDto, id: string) {
    const updatedContact = await ContactModel.findOneAndUpdate({ _id: id }, { $set: { status: data.status } }, { new: true });

    if (!updatedContact) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.CONTACT_NOT_FOUND);
    }
  }

  public async changeInquiryStatus(data: ChangeSupportRequestStatusDto, id: string) {
    const updatedInquiry = await InquiryModel.findOneAndUpdate({ _id: id }, { $set: { status: data.status } }, { new: true });

    if (!updatedInquiry) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.INQUIRY_NOT_FOUND);
    }
  }

  public async changeHelpSupportStatus(data: ChangeSupportRequestStatusDto, id: string) {
    const updatedHelpSupport = await CustomerQueryModel.findOneAndUpdate({ _id: id }, { $set: { status: data.status } }, { new: true });

    if (!updatedHelpSupport) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.CUSTOMER_QUERY_NOT_FOUND);
    }
  }
}
