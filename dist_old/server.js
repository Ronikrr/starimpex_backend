"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const validateEnv_1 = require("./utils/validateEnv");
(0, validateEnv_1.ValidateEnv)();
const app = new app_1.default();
app.listen();
//# sourceMappingURL=server.js.map