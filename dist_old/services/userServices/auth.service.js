"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const HttpException_1 = require("../../exceptions/HttpException");
const users_interface_1 = require("../../interfaces/users.interface");
const users_model_1 = require("../../models/users.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const bcrypt_1 = require("bcrypt");
const typedi_1 = require("typedi");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("../../config");
const crypto_1 = require("crypto");
const mailer_1 = require("../../utils/mailer");
const notification_service_1 = tslib_1.__importDefault(require("../adminServices/notification.service"));
const adminSettings_model_1 = require("../../models/adminSettings.model");
const notification_interface_1 = require("../../interfaces/adminInterfaces/notification.interface");
const createToken = (user) => {
    const dataStoredInToken = { _id: user._id };
    return (0, jsonwebtoken_1.sign)(dataStoredInToken, _config_1.SECRET_KEY, { expiresIn: '1d' });
};
async function newRegistrationNotification(createdUser) {
    var _a;
    const notificationService = new notification_service_1.default();
    const fcmToken = ((_a = (await adminSettings_model_1.AdminSettingsModel.findOne())) === null || _a === void 0 ? void 0 : _a.fcmTokens) || [];
    const notification = {
        title: 'New Registration',
        body: `${createdUser.fullName} [${createdUser.email}] has registered.`,
        type: notification_interface_1.ENotificationType.NEW_REGISTRATION,
        url: '/admin/user-list',
    };
    await notificationService.createNotification(notification, fcmToken);
}
let AuthService = class AuthService {
    async signUp(userData) {
        const { password } = userData, otherDetails = tslib_1.__rest(userData, ["password"]);
        const findUser = await users_model_1.UserModel.findOne({ email: otherDetails.email.toLowerCase() });
        if (findUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_ALREADY_EXISTS);
        }
        const newHashPassword = await (0, bcrypt_1.hash)(password, 10);
        const createdUser = await users_model_1.UserModel.create(Object.assign(Object.assign({}, otherDetails), { fullName: `${otherDetails.firstName} ${otherDetails.lastName}`, email: otherDetails.email.toLowerCase(), password: newHashPassword }));
        (0, mailer_1.sendSignUpMail)(createdUser);
        newRegistrationNotification(createdUser);
    }
    async signIn(userCredentials) {
        const findUser = await users_model_1.UserModel.findOne({ email: userCredentials.email.toString() });
        if (findUser && findUser.status !== users_interface_1.EUserStatus.APPROVED) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_NOT_APPROVED);
        }
        if (!findUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.INVALID_CREDENTIALS);
        }
        const passwordMatched = await (0, bcrypt_1.compare)(userCredentials.password, findUser.password);
        if (!passwordMatched) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.INVALID_CREDENTIALS);
        }
        const token = createToken(findUser);
        const updatedUser = await users_model_1.UserModel.findOneAndUpdate({ email: userCredentials.email.toLowerCase() }, { $set: { token } }, { new: true });
        if (!updatedUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_UPDATE_ERROR);
        }
        return updatedUser;
    }
    async logout(userData) {
        const findUser = await users_model_1.UserModel.findOneAndUpdate({ _id: userData._id }, { token: null }, { new: true });
        if (!findUser)
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_UPDATE_ERROR);
    }
    async forgotPassword(data) {
        const findUser = await users_model_1.UserModel.findOne({ email: data.email.toString(), status: users_interface_1.EUserStatus.APPROVED });
        if (!findUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_NOT_FOUND);
        }
        const hash = (0, crypto_1.createHmac)('sha256', _config_1.SECRET_KEY).update(data.email).digest('hex');
        (0, mailer_1.sendForgotPasswordMail)(data.email, hash);
    }
    async resetPassword(data) {
        const newHash = (0, crypto_1.createHmac)('sha256', _config_1.SECRET_KEY).update(data.email).digest('hex');
        if (newHash !== data.hash) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.INVALID_REQUEST);
        }
        const findUser = await users_model_1.UserModel.findOne({ email: data.email.toString(), status: users_interface_1.EUserStatus.APPROVED });
        if (!findUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_NOT_FOUND);
        }
        const newHashPassword = await (0, bcrypt_1.hash)(data.password, 10);
        const updatedUser = await users_model_1.UserModel.findOneAndUpdate({ email: data.email }, { $set: { password: newHashPassword } }, { new: true });
        if (!updatedUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.USER_UPDATE_ERROR);
        }
    }
};
AuthService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map