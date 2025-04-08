"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
const _config_1 = require("../config");
const dbConnection = async () => {
    await (0, mongoose_1.connect)(_config_1.MONGODB_URI);
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=index.js.map