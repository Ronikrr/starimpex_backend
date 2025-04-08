"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSupportController = void 0;
const tslib_1 = require("tslib");
const response_messages_1 = require("../../response/response.messages");
const support_service_1 = require("../../services/userServices/support.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class CustomerSupportController {
    constructor() {
        this.supportService = typedi_1.default.get(support_service_1.CustomerSupportService);
        this.contactUs = async (req, res, next) => {
            try {
                const data = req.body;
                await this.supportService.contactUs(data);
                res.success(response_messages_1.ResponseMessages.SUPPORT_REQUEST_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.inquiry = async (req, res, next) => {
            try {
                const data = req.body;
                await this.supportService.inquiry(data);
                res.success(response_messages_1.ResponseMessages.SUPPORT_REQUEST_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.feedback = async (req, res, next) => {
            try {
                const data = req.body;
                await this.supportService.feedback(data, req.user);
                res.success(response_messages_1.ResponseMessages.FEEDBACK_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
        this.helpSupport = async (req, res, next) => {
            try {
                const data = req.body;
                await this.supportService.helpSupport(data, req.user);
                res.success(response_messages_1.ResponseMessages.SUPPORT_REQUEST_SUCCESS);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CustomerSupportController = CustomerSupportController;
//# sourceMappingURL=support.controller.js.map