"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const contact_model_1 = require("../../models/contact.model");
const customerQuery_model_1 = require("../../models/customerQuery.model");
const feedback_model_1 = require("../../models/feedback.model");
const inquiry_model_1 = require("../../models/inquiry.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = require("typedi");
let SupportService = class SupportService {
    async getContactList(getData) {
        const findCondition = {};
        if (getData.status) {
            findCondition.status = getData.status;
        }
        if (getData.search) {
            findCondition.$text = { $search: getData.search };
        }
        const totalCount = await contact_model_1.ContactModel.countDocuments(findCondition);
        if (!totalCount) {
            return {
                contacts: [],
                totalPages: 0,
            };
        }
        const contacts = await contact_model_1.ContactModel.find(findCondition).sort({ updatedAt: -1 }).skip(getData.skip).limit(getData.limit);
        return {
            contacts,
            totalPages: Math.ceil(totalCount / getData.limit),
        };
    }
    async getInquiryList(getData) {
        const findCondition = {};
        if (getData.status) {
            findCondition.status = getData.status;
        }
        if (getData.search) {
            findCondition.$text = { $search: getData.search };
        }
        const totalCount = await inquiry_model_1.InquiryModel.countDocuments(findCondition);
        if (!totalCount) {
            return {
                inquires: [],
                totalPages: 0,
            };
        }
        const inquires = await inquiry_model_1.InquiryModel.find(findCondition).sort({ updatedAt: -1 }).skip(getData.skip).limit(getData.limit);
        return {
            inquires,
            totalPages: Math.ceil(totalCount / getData.limit),
        };
    }
    async getFeedbackList(getData) {
        const findCondition = {};
        if (getData.user) {
            findCondition.user = getData.user;
        }
        const totalCount = await feedback_model_1.FeedbackModel.countDocuments(findCondition);
        if (!totalCount) {
            return {
                feedbacks: [],
                totalPages: 0,
            };
        }
        const feedbacks = await feedback_model_1.FeedbackModel.find(findCondition)
            .populate('user', adminFilters_1.filterUserProjection)
            .sort({ createdAt: -1 })
            .skip(getData.skip)
            .limit(getData.limit);
        return {
            feedbacks,
            totalPages: Math.ceil(totalCount / getData.limit),
        };
    }
    async getHelpSupportList(getData) {
        const findCondition = {};
        if (getData.status) {
            findCondition.status = getData.status;
        }
        if (getData.user) {
            findCondition.user = getData.user;
        }
        const totalCount = await customerQuery_model_1.CustomerQueryModel.countDocuments(findCondition);
        if (!totalCount) {
            return {
                queries: [],
                totalPages: 0,
            };
        }
        const queries = await customerQuery_model_1.CustomerQueryModel.find(findCondition)
            .populate('user', adminFilters_1.filterUserProjection)
            .sort({ updatedAt: -1 })
            .skip(getData.skip)
            .limit(getData.limit);
        return {
            queries,
            totalPages: Math.ceil(totalCount / getData.limit),
        };
    }
    async changeContactStatus(data, id) {
        const updatedContact = await contact_model_1.ContactModel.findOneAndUpdate({ _id: id }, { $set: { status: data.status } }, { new: true });
        if (!updatedContact) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.CONTACT_NOT_FOUND);
        }
    }
    async changeInquiryStatus(data, id) {
        const updatedInquiry = await inquiry_model_1.InquiryModel.findOneAndUpdate({ _id: id }, { $set: { status: data.status } }, { new: true });
        if (!updatedInquiry) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.INQUIRY_NOT_FOUND);
        }
    }
    async changeHelpSupportStatus(data, id) {
        const updatedHelpSupport = await customerQuery_model_1.CustomerQueryModel.findOneAndUpdate({ _id: id }, { $set: { status: data.status } }, { new: true });
        if (!updatedHelpSupport) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_NOT_FOUND, response_messages_1.ResponseMessages.CUSTOMER_QUERY_NOT_FOUND);
        }
    }
};
SupportService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], SupportService);
exports.SupportService = SupportService;
//# sourceMappingURL=support.service.js.map