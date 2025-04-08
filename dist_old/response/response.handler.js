"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_codes_1 = require("./response.codes");
exports.default = (req, res, next) => {
    res.success = (message, data) => {
        res.status(response_codes_1.CODE_SUCCESS).json({
            responseCode: response_codes_1.CODE_SUCCESS,
            data: data,
            message: message,
        });
    };
    res.error = (errorCode, message, data) => {
        res.status(response_codes_1.CODE_SUCCESS).json({
            responseCode: errorCode,
            data: data,
            message: message,
        });
    };
    next();
};
//# sourceMappingURL=response.handler.js.map