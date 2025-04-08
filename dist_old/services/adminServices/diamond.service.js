"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const exceljs_1 = tslib_1.__importDefault(require("exceljs"));
const uploadViaFile_1 = require("../../utils/uploadViaFile");
const HttpException_1 = require("../../exceptions/HttpException");
const response_codes_1 = require("../../response/response.codes");
const fileParse_1 = require("../../utils/parser/fileParse");
const diamonds_model_1 = require("../../models/diamonds.model");
const diamonds_interface_1 = require("../../interfaces/diamonds.interface");
const cart_model_1 = require("../../models/cart.model");
const priceTracker_model_1 = require("../../models/priceTracker.model");
const response_messages_1 = require("../../response/response.messages");
let DiamondService = class DiamondService {
    async validateUploadedDiamondsFile(worksheet) {
        const currentFileHeaders = [];
        const actualHeaders = Object.values(uploadViaFile_1.uploadDiamondsFileHeader);
        worksheet.getRow(1).eachCell(cell => currentFileHeaders.push(cell.text));
        const isValidHeaders = actualHeaders.every((header, index) => currentFileHeaders[index] === header);
        if (!isValidHeaders || worksheet.actualRowCount === 1) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_EMPTY_INVALID_ERROR);
        }
        const totalRecords = worksheet.actualRowCount - 1;
        const stoneNoList = worksheet.getColumn(1).values.slice(2);
        const isStoneNoInvalid = totalRecords !== stoneNoList.length || stoneNoList.some(value => value.toString().trim() === '');
        if (isStoneNoInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_STONE_NO_REQUIRED_ERROR);
        }
        const rapList = worksheet.getColumn(13).values.slice(2);
        const isRapInvalid = totalRecords !== rapList.length || rapList.some(value => isNaN(Number(value)));
        if (isRapInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_RAP_INVALID_ERROR);
        }
        const pricePerCaratList = worksheet.getColumn(14).values.slice(2);
        const isPricePerCaratInvalid = totalRecords !== pricePerCaratList.length || pricePerCaratList.some(value => isNaN(Number(value)));
        if (isPricePerCaratInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_PRICE_PER_CARAT_INVALID_ERROR);
        }
        const discountList = worksheet.getColumn(15).values.slice(2);
        const isDiscountInvalid = totalRecords !== discountList.length || discountList.some(value => isNaN(Number(value)));
        if (isDiscountInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_DISCOUNT_INVALID_ERROR);
        }
        const priceList = worksheet.getColumn(16).values.slice(2);
        const isPriceInvalid = totalRecords !== priceList.length || priceList.some(value => isNaN(Number(value)));
        if (isPriceInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_PRICE_INVALID_ERROR);
        }
        const diamondTypes = worksheet.getColumn(10).values.slice(2);
        const isDiamondTypeInvalid = diamondTypes.length !== totalRecords || diamondTypes.some(value => !value || !uploadViaFile_1.diamondTypeValues.includes(value.toString().toLowerCase()));
        if (isDiamondTypeInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_DIAMOND_TYPE_ERROR);
        }
        const statuses = worksheet.getColumn(57).values.slice(2);
        const isStatusInvalid = totalRecords !== statuses.length || statuses.some(value => !value || !uploadViaFile_1.statusValues.includes(value.toString().toLowerCase()));
        if (isStatusInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_STATUS_ERROR);
        }
        const labGrownRowNumbers = [];
        const naturalRowNumbers = [];
        worksheet.getColumn(10).eachCell((cell, rowNumber) => {
            if (cell.value.toString().toLowerCase() === uploadViaFile_1.diamondTypeValues[0]) {
                labGrownRowNumbers.push(rowNumber);
            }
            if (cell.value.toString().toLowerCase() === uploadViaFile_1.diamondTypeValues[1]) {
                naturalRowNumbers.push(rowNumber);
            }
        });
        const labGrownLabList = [];
        const naturalLabList = [];
        worksheet.getColumn(2).eachCell((cell, rowNumber) => {
            if (labGrownRowNumbers.includes(rowNumber) && cell.value) {
                labGrownLabList.push(cell.value);
            }
            if (naturalRowNumbers.includes(rowNumber) && cell.value) {
                naturalLabList.push(cell.value);
            }
        });
        const isLabInvalid = labGrownLabList.some(value => value && !uploadViaFile_1.labGrownLabValues.includes(value.toString().toLowerCase())) ||
            naturalLabList.some(value => value && !uploadViaFile_1.naturalLabValues.includes(value.toString().toLowerCase()));
        if (isLabInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_LAB_ERROR);
        }
        const isShapeInvalid = worksheet
            .getColumn(3)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.shapeValues.includes(value.toString().toLowerCase()));
        if (isShapeInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_SHAPE_ERROR);
        }
        const isColorInvalid = worksheet
            .getColumn(5)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.colorValues.includes(value.toString().toLowerCase()));
        if (isColorInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_COLOR_ERROR);
        }
        const isClarityInvalid = worksheet
            .getColumn(6)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.clarityValues.includes(value.toString().toLowerCase()));
        if (isClarityInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_CLARITY_ERROR);
        }
        const isCutInvalid = worksheet
            .getColumn(7)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.cutValues.includes(value.toString().toLowerCase()));
        if (isCutInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_CUT_ERROR);
        }
        const isPolishInvalid = worksheet
            .getColumn(8)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.polishValues.includes(value.toString().toLowerCase()));
        if (isPolishInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_POLISH_ERROR);
        }
        const isSymmetryInvalid = worksheet
            .getColumn(9)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.symmetryValues.includes(value.toString().toLowerCase()));
        if (isSymmetryInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_SYMMETRY_ERROR);
        }
        const allLabGrownSubTypeList = [];
        worksheet.getColumn(11).eachCell((cell, rowNumber) => {
            if (labGrownRowNumbers.includes(rowNumber) && cell.value) {
                allLabGrownSubTypeList.push(cell.value);
            }
        });
        const isSubTypeInvalid = allLabGrownSubTypeList.some(value => value && !uploadViaFile_1.labGrownTypeValues.includes(value.toString().toLowerCase()));
        if (isSubTypeInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_SUB_TYPE_ERROR);
        }
        const isInscriptionInvalid = worksheet
            .getColumn(17)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.inscriptionValues.includes(value.toString().toLowerCase()));
        if (isInscriptionInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_INSCRIPTION_ERROR);
        }
        const isNoBGMInvalid = worksheet
            .getColumn(18)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.noBGMValues.includes(value.toString().toLowerCase()));
        if (isNoBGMInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_NO_BGM_ERROR);
        }
        const isLusterInvalid = worksheet
            .getColumn(21)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.lusterValues.includes(value.toString().toLowerCase()));
        if (isLusterInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_LUSTER_ERROR);
        }
        const isEyeCleanInvalid = worksheet
            .getColumn(23)
            .values.slice(2)
            .some(value => (value && isNaN(Number(value))) || Number(value) < uploadViaFile_1.eyeCleanRange.from || Number(value) > uploadViaFile_1.eyeCleanRange.to);
        if (isEyeCleanInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_EYE_CLEAN_ERROR);
        }
        const isHeartsAndArrowsInvalid = worksheet
            .getColumn(32)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.heartsAndArrowsValues.includes(value.toString().toLowerCase()));
        if (isHeartsAndArrowsInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_HEARTS_ARROWS_ERROR);
        }
        const allLabGrownCuletList = [];
        const allNaturalCuletList = [];
        worksheet.getColumn(33).eachCell((cell, rowNumber) => {
            if (labGrownRowNumbers.includes(rowNumber) && cell.value) {
                allLabGrownCuletList.push(cell.value);
            }
            if (naturalRowNumbers.includes(rowNumber) && cell.value) {
                allNaturalCuletList.push(cell.value);
            }
        });
        const isCuletInvalid = allLabGrownCuletList.some(value => value && !uploadViaFile_1.labGrownCuletSizeValues.includes(value.toString().toLowerCase())) ||
            allNaturalCuletList.some(value => value && !uploadViaFile_1.naturalCuletSizeValues.includes(value.toString().toLowerCase()));
        if (isCuletInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_CULET_SIZE_ERROR);
        }
        const isFancyColorInvalid = worksheet
            .getColumn(34)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.fancyColorValues.includes(value.toString().toLowerCase()));
        if (isFancyColorInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_FANCY_COLOR_ERROR);
        }
        const isFancyIntensityInvalid = worksheet
            .getColumn(35)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.fancyIntensityValues.includes(value.toString().toLowerCase()));
        if (isFancyIntensityInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_FANCY_INTENSITY_ERROR);
        }
        const isFancyOvertoneInvalid = worksheet
            .getColumn(36)
            .values.slice(2)
            .some(value => value && !uploadViaFile_1.fancyOvertoneValues.includes(value.toString().toLowerCase()));
        if (isFancyOvertoneInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_FANCY_OVERTONE_ERROR);
        }
        const labGrownKeyToSymbolList = [];
        const naturalKeyToSymbolList = [];
        worksheet.getColumn(53).eachCell((cell, rowNumber) => {
            if (labGrownRowNumbers.includes(rowNumber) && cell.value) {
                labGrownKeyToSymbolList.push(cell.value);
            }
            if (naturalRowNumbers.includes(rowNumber) && cell.value) {
                naturalKeyToSymbolList.push(cell.value);
            }
        });
        const isKeyToSymbolInvalid = labGrownKeyToSymbolList.length || naturalKeyToSymbolList.some(value => value && !uploadViaFile_1.keyToSymbolValues.includes(value.toString().toLowerCase()));
        if (isKeyToSymbolInvalid) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_KEY_TO_SYMBOL_ERROR);
        }
    }
    async convertExcelToArray(file) {
        const workbook = new exceljs_1.default.Workbook();
        await workbook.xlsx.load(file.buffer);
        const worksheet = workbook.getWorksheet(1);
        this.validateUploadedDiamondsFile(worksheet);
        const excelData = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                excelData[rowNumber - 2] = [];
                row.eachCell((cell, cellNumber) => {
                    excelData[rowNumber - 2][cellNumber - 1] = cell.value;
                });
            }
        });
        const parsedData = (0, fileParse_1.parseFileData)(excelData);
        return parsedData;
    }
    async uploadViaFile(file) {
        if (!file) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_UPLOAD_FILE_ERROR);
        }
        const fileExtension = file.originalname.split('.').pop();
        if (!uploadViaFile_1.excelExtensions.includes(fileExtension)) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.UPLOAD_VIA_FILE_INVALID_FILE_ERROR);
        }
        const { parsedData, soldUniqueStoneIds } = await this.convertExcelToArray(file);
        const promiseArray = [];
        for (const diamondData of parsedData) {
            const { uniqueStoneId } = diamondData, otherData = tslib_1.__rest(diamondData, ["uniqueStoneId"]);
            promiseArray.push(diamonds_model_1.DiamondModel.updateOne({ uniqueStoneId: uniqueStoneId }, {
                $set: otherData,
            }, {
                upsert: true,
                new: true,
            }));
        }
        if (promiseArray.length) {
            await Promise.allSettled(promiseArray);
        }
        if (soldUniqueStoneIds.length) {
            await diamonds_model_1.DiamondModel.deleteMany({ uniqueStoneId: { $in: soldUniqueStoneIds }, source: diamonds_interface_1.ESourceType.FILE });
            await cart_model_1.CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $in: soldUniqueStoneIds }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.FILE });
            await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $in: soldUniqueStoneIds }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.FILE }, { $set: { status: diamonds_interface_1.EDiamondStatus.SOLD } });
            await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $nin: soldUniqueStoneIds }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.FILE }, { $set: { status: diamonds_interface_1.EDiamondStatus.AVAILABLE } });
        }
    }
    async getDiamondUploadFile() {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('upload');
        const headers = [];
        for (const key in uploadViaFile_1.uploadDiamondsFileHeader) {
            headers.push({ header: uploadViaFile_1.uploadDiamondsFileHeader[key], key: key });
        }
        worksheet.columns = headers;
        const worksheet1 = workbook.addWorksheet('values');
        worksheet1.addRows(uploadViaFile_1.uploadViaFileValues);
        worksheet1.getColumn(1).width = 30;
        const excelBuffer = await workbook.xlsx.writeBuffer();
        return excelBuffer;
    }
};
DiamondService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], DiamondService);
exports.DiamondService = DiamondService;
//# sourceMappingURL=diamond.service.js.map