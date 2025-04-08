"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const logger_1 = require("../utils/logger");
const response_messages_1 = require("../response/response.messages");
const response_codes_1 = require("../response/response.codes");
const ErrorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || response_codes_1.CODE_INTERNAL_SERVER_ERROR;
        const message = error.message || response_messages_1.ResponseMessages.SOMETHING_WENT_WRONG;
        const data = error.data || null;
        logger_1.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        if (status === 500) {
            logger_1.logger.error(error.stack);
        }
        const response = { responseCode: status, message };
        if (data) {
            response.data = data;
        }
        res.status(status).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=error.middleware.js.map