"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const users_model_1 = require("../models/users.model");
const users_interface_1 = require("../interfaces/users.interface");
const response_codes_1 = require("../response/response.codes");
const response_messages_1 = require("../response/response.messages");
const getAuthorization = req => {
    const header = req.header('Authorization');
    if (header)
        return header.split('Bearer ')[1];
    return null;
};
const authMiddleware = async (req, res, next) => {
    try {
        const Authorization = getAuthorization(req);
        if (!Authorization) {
            next(new HttpException_1.HttpException(response_codes_1.CODE_BAD_REQUEST, response_messages_1.ResponseMessages.MISSING_AUTH_TOKEN));
        }
        const { _id } = (await (0, jsonwebtoken_1.verify)(Authorization, _config_1.SECRET_KEY));
        const findUser = await users_model_1.UserModel.findOne({ _id });
        if (!findUser || findUser.status !== users_interface_1.EUserStatus.APPROVED) {
            next(new HttpException_1.HttpException(response_codes_1.CODE_UNAUTHORIZED, response_messages_1.ResponseMessages.INVALID_AUTH_TOKEN));
        }
        req.user = findUser;
        next();
    }
    catch (error) {
        next(new HttpException_1.HttpException(response_codes_1.CODE_UNAUTHORIZED, response_messages_1.ResponseMessages.INVALID_AUTH_TOKEN));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=userAuth.middleware.js.map