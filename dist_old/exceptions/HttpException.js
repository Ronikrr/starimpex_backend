"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message, data) {
        super(message);
        this.status = status;
        if (data) {
            this.data = data;
        }
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map