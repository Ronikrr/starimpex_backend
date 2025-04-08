"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const userAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/userAuth.middleware"));
const diamond_dto_1 = require("../../dtos/userDtos/diamond.dto");
const diamond_controller_1 = require("../../controllers/userControllers/diamond.controller");
const common_dto_1 = require("../../dtos/common.dto");
class DiamondRoute {
    constructor() {
        this.path = '/diamond';
        this.router = (0, express_1.Router)();
        this.diamondController = new diamond_controller_1.DiamondController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/list`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.GetDiamondListDto, 'query'), this.diamondController.getDiamondList);
        this.router.get(`${this.path}/details/:id`, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.diamondController.getDiamond);
        this.router.put(`${this.path}/notes/update`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.AddDiamondNotes), this.diamondController.addDiamondNotes);
        this.router.post(`${this.path}/search/save`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.SaveDiamondSearchDto), this.diamondController.saveDiamondSearch);
        this.router.post(`${this.path}/export`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.ExportExcelDto), this.diamondController.exportDiamondsToExcel);
        this.router.post(`${this.path}/send-excel-mail`, userAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.SendExcelMailDto), this.diamondController.sendDiamondExcelMail);
        this.router.get(`${this.path}/certificate/:id`, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.diamondController.getCertificate);
        this.router.get(`${this.path}/video/:id`, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.diamondController.getVideo);
    }
}
exports.DiamondRoute = DiamondRoute;
//# sourceMappingURL=diamond.route.js.map