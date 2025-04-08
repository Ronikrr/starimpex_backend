"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const support_controller_1 = require("../../controllers/adminControllers/support.controller");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const support_dto_1 = require("../../dtos/adminDtos/support.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const common_dto_1 = require("../../dtos/common.dto");
class SupportRoute {
    constructor() {
        this.path = '/support';
        this.router = (0, express_1.Router)();
        this.supportController = new support_controller_1.SupportController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/contact/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(support_dto_1.GetContactListDto, 'query'), this.supportController.getContactList);
        this.router.get(`${this.path}/inquiry/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(support_dto_1.GetInquiryListDto, 'query'), this.supportController.getInquiryList);
        this.router.get(`${this.path}/feedback/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(support_dto_1.GetFeedbackListDto, 'query'), this.supportController.getFeedbackList);
        this.router.get(`${this.path}/help/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(support_dto_1.GetHelpSupportListDto, 'query'), this.supportController.getHelpSupportList);
        this.router.put(`${this.path}/contact/change-status/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(support_dto_1.ChangeSupportRequestStatusDto), this.supportController.changeContactStatus);
        this.router.put(`${this.path}/inquiry/change-status/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(support_dto_1.ChangeSupportRequestStatusDto), this.supportController.changeInquiryStatus);
        this.router.put(`${this.path}/help/change-status/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), (0, validation_middleware_1.default)(support_dto_1.ChangeSupportRequestStatusDto), this.supportController.changeHelpSupportStatus);
    }
}
exports.SupportRoute = SupportRoute;
//# sourceMappingURL=support.route.js.map