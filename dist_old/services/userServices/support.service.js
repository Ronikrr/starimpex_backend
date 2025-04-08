"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSupportService = void 0;
const tslib_1 = require("tslib");
const contact_model_1 = require("../../models/contact.model");
const customerQuery_model_1 = require("../../models/customerQuery.model");
const feedback_model_1 = require("../../models/feedback.model");
const inquiry_model_1 = require("../../models/inquiry.model");
const mailer_1 = require("../../utils/mailer");
const typedi_1 = require("typedi");
let CustomerSupportService = class CustomerSupportService {
    constructor() {
        this.contactUs = async (data) => {
            const contactCreated = await contact_model_1.ContactModel.create({
                firstName: data.firstName.toLowerCase(),
                lastName: data.lastName.toLowerCase(),
                phone: data.phone,
                email: data.email.toLowerCase(),
                country: data.country.toLowerCase(),
                message: data.message,
            });
            (0, mailer_1.sendContactUsMail)(contactCreated);
        };
        this.inquiry = async (data) => {
            const inquiryCreated = await inquiry_model_1.InquiryModel.create({
                firstName: data.firstName.toLowerCase(),
                lastName: data.lastName.toLowerCase(),
                phone: data.phone,
                email: data.email.toLowerCase(),
                companyName: data.companyName ? data.companyName.toLowerCase() : null,
                diamondType: data.diamondType,
                country: data.country.toLowerCase(),
                message: data.message,
            });
            (0, mailer_1.sendInquiryMail)(inquiryCreated);
        };
        this.feedback = async (data, user) => {
            await feedback_model_1.FeedbackModel.create({
                rating: data.rating,
                comment: data.comment,
                user: user._id,
            });
        };
        this.helpSupport = async (data, user) => {
            await customerQuery_model_1.CustomerQueryModel.create({
                message: data.message,
                user: user._id,
            });
        };
    }
};
CustomerSupportService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], CustomerSupportService);
exports.CustomerSupportService = CustomerSupportService;
//# sourceMappingURL=support.service.js.map