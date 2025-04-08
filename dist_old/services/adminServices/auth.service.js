"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const typedi_1 = require("typedi");
const _config_1 = require("../../config");
const HttpException_1 = require("../../exceptions/HttpException");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const adminSettings_model_1 = require("../../models/adminSettings.model");
const createToken = (user) => {
    const dataStoredInToken = { username: user.username };
    return (0, jsonwebtoken_1.sign)(dataStoredInToken, _config_1.SECRET_KEY, { expiresIn: '1d' });
};
let AuthService = class AuthService {
    async login(getData) {
        if (getData.username !== _config_1.ADMIN_USERNAME || getData.password !== _config_1.ADMIN_PASSWORD) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.INVALID_CREDENTIALS);
        }
        const token = createToken(getData);
        if (getData.fcmToken) {
            await adminSettings_model_1.AdminSettingsModel.findOneAndUpdate({}, { $addToSet: { fcmTokens: getData.fcmToken } }, { upsert: true });
        }
        return token;
    }
    async logout(data) {
        if (data.fcmToken) {
            await adminSettings_model_1.AdminSettingsModel.findOneAndUpdate({}, { $pull: { fcmTokens: data.fcmToken } });
        }
    }
};
AuthService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map