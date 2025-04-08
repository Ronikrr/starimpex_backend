"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const support_service_1 = require("../../services/adminServices/support.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class SupportController {
    constructor() {
        this.supportService = typedi_1.default.get(support_service_1.SupportService);
        this.getContactList = async (req, res, next) => {
            var _a, _b, _c, _d;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const search = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.search) ? String(req.query.search).toLowerCase() : null;
                const status = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.status) ? String(req.query.status) : null;
                const data = await this.supportService.getContactList({ limit, skip, search, status });
                res.success(response_messages_1.ResponseMessages.CONTACT_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getInquiryList = async (req, res, next) => {
            var _a, _b, _c, _d;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const search = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.search) ? String(req.query.search).toLowerCase() : null;
                const status = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.status) ? String(req.query.status) : null;
                const data = await this.supportService.getInquiryList({ limit, skip, search, status });
                res.success(response_messages_1.ResponseMessages.INQUIRY_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getFeedbackList = async (req, res, next) => {
            var _a, _b, _c;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const user = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.user) ? String(req.query.user) : null;
                const data = await this.supportService.getFeedbackList({ limit, skip, user });
                res.success(response_messages_1.ResponseMessages.FEEDBACK_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.getHelpSupportList = async (req, res, next) => {
            var _a, _b, _c, _d;
            try {
                const limit = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const skip = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.skip) ? Number(req.query.skip) : 0;
                const user = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.user) ? String(req.query.user) : null;
                const status = ((_d = req.query) === null || _d === void 0 ? void 0 : _d.status) ? String(req.query.status) : null;
                const data = await this.supportService.getHelpSupportList({ limit, skip, status, user });
                res.success(response_messages_1.ResponseMessages.CUSTOMER_QUERY_LIST_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
        this.changeContactStatus = async (req, res, next) => {
            try {
                const id = req.params.id ? String(req.params.id) : null;
                await this.supportService.changeContactStatus(req.body, id);
                res.success(response_messages_1.ResponseMessages.CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.changeInquiryStatus = async (req, res, next) => {
            try {
                const id = req.params.id ? String(req.params.id) : null;
                await this.supportService.changeInquiryStatus(req.body, id);
                res.success(response_messages_1.ResponseMessages.CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.changeHelpSupportStatus = async (req, res, next) => {
            try {
                const id = req.params.id ? String(req.params.id) : null;
                await this.supportService.changeHelpSupportStatus(req.body, id);
                res.success(response_messages_1.ResponseMessages.CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.SupportController = SupportController;
//# sourceMappingURL=support.controller.js.map