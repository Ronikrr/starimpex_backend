"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const HttpException_1 = require("../../exceptions/HttpException");
const users_model_1 = require("../../models/users.model");
const response_codes_1 = require("../../response/response.codes");
const response_messages_1 = require("../../response/response.messages");
const mailer_1 = require("../../utils/mailer");
const crypto_1 = require("crypto");
const typedi_1 = require("typedi");
let UserService = class UserService {
    async editUser(updateUser, user) {
        const updatedUser = await users_model_1.UserModel.findOneAndUpdate({ _id: user._id }, {
            $set: {
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                fullName: `${updateUser.firstName} ${updateUser.lastName}`,
                companyName: updateUser.companyName,
                address: updateUser.address,
                state: updateUser.state,
                city: updateUser.city,
                country: updateUser.country,
                mobileNumber: updateUser.mobileNumber || null,
                telephoneNumber: updateUser.telephoneNumber || null,
                messengerType: updateUser.messengerType || null,
                messengerIdNumber: updateUser.messengerIdNumber || null,
                website: updateUser.website || null,
                notes: updateUser.notes || null,
            },
        }, { new: true });
        if (!updatedUser) {
            throw new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.SOMETHING_WENT_WRONG);
        }
        return updatedUser;
    }
    async changePassword(user) {
        const hash = (0, crypto_1.createHmac)('sha256', config_1.SECRET_KEY).update(user.email).digest('hex');
        (0, mailer_1.sendChangePasswordMail)(user.email, hash);
    }
};
UserService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map