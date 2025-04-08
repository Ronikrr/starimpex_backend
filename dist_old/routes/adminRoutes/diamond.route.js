"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondRoute = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../../middlewares/validation.middleware"));
const diamond_dto_1 = require("../../dtos/userDtos/diamond.dto");
const common_dto_1 = require("../../dtos/common.dto");
const adminAuth_middleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuth.middleware"));
const diamond_controller_1 = require("../../controllers/adminControllers/diamond.controller");
const multer_1 = tslib_1.__importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
class DiamondRoute {
    constructor() {
        this.path = '/diamond';
        this.router = (0, express_1.Router)();
        this.diamondController = new diamond_controller_1.DiamondController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/list`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.GetDiamondListDto, 'query'), this.diamondController.getDiamondList);
        this.router.get(`${this.path}/details/:id`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(common_dto_1.ParamsObjectIdDto, 'params'), this.diamondController.getDiamond);
        this.router.post(`${this.path}/export`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.ExportExcelDto), this.diamondController.exportDiamondsToExcel);
        this.router.post(`${this.path}/send-excel-mail`, adminAuth_middleware_1.default, (0, validation_middleware_1.default)(diamond_dto_1.SendExcelMailDto), this.diamondController.sendDiamondExcelMail);
        this.router.post(`${this.path}/upload-via-file`, adminAuth_middleware_1.default, upload.single('file'), this.diamondController.uploadViaFile);
        this.router.get(`${this.path}/upload-file/download`, adminAuth_middleware_1.default, this.diamondController.getDiamondUploadFile);
    }
}
exports.DiamondRoute = DiamondRoute;
//# sourceMappingURL=diamond.route.js.map