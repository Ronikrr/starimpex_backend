"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSupportRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const support_controller_1 = require("../../controllers/userControllers/support.controller");
const support_dto_1 = require("../../dtos/userDtos/support.dto");
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
class CustomerSupportRoute {
    constructor() {
        this.path = '/support';
        this.router = (0, express_1.Router)();
        this.supportController = new support_controller_1.CustomerSupportController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/contact`, (0, validation_middleware_1.default)(support_dto_1.ContactUsDto), this.supportController.contactUs);
        this.router.post(`${this.path}/inquiry`, (0, validation_middleware_1.default)(support_dto_1.InquiryDto), this.supportController.inquiry);
        this.router.post(`${this.path}/feedback`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(support_dto_1.FeedbackDto), this.supportController.feedback);
        this.router.post(`${this.path}/help`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(support_dto_1.HelpSupportDto), this.supportController.helpSupport);
    }
}
exports.CustomerSupportRoute = CustomerSupportRoute;
//# sourceMappingURL=support.route.js.map