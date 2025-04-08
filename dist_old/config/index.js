"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_NUMBER_PREFIX = exports.INITIAL_ORDER_NUMBER = exports.APP_URL = exports.RAPNET_API_GET_PRICE_LIST = exports.RAPNET_API_GET_TOKEN_URL = exports.RAPNET_API_CLIENT_SECRET = exports.RAPNET_API_CLIENT_ID = exports.BAPA_SITARAM_STONE_NUMBER_PREFIX = exports.BAPA_SITARAM_API_KEY = exports.BAPA_SITARAM_SOURCE_API_URL = exports.ECOSTAR_SOURCE_AUTH_TOKEN = exports.ECOSTAR_SOURCE_API_URL = exports.ECOSTAR_STONE_NUMBER_PREFIX = exports.ANJALI_SOURCE_AUTH_TOKEN = exports.ANJALI_SOURCE_API_URL = exports.ANJALI_STONE_NUMBER_PREFIX = exports.MAITRI_API_URL = exports.MAITRI_AUTH_TOKEN = exports.MAITRI_STONE_NUMBER_PREFIX = exports.FILE_STONE_NUMBER_PREFIX = exports.UPLOAD_DIAMOND_LIMIT = exports.UPLOAD_DIAMOND_CRON_INTERVAL = exports.SUPPORT_EMAIL = exports.COMPANY_LOGO = exports.INFO_EMAIL = exports.COMPANY_ADDRESS = exports.SENDER_NAME = exports.MAIL_SECURE = exports.MAIL_PORT = exports.MAIL_HOST = exports.MAIL_SERVICE = exports.SENDER_EMAIL_PASSWORD = exports.SENDER_EMAIL_ID = exports.PAGE_LIMIT = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = exports.MONGODB_URI = exports.ORIGIN = exports.LOG_DIR = exports.LOG_FORMAT = exports.SECRET_KEY = exports.PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.SECRET_KEY = _a.SECRET_KEY, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.ORIGIN = _a.ORIGIN;
exports.MONGODB_URI = process.env.MONGODB_URI;
_b = process.env, exports.ADMIN_USERNAME = _b.ADMIN_USERNAME, exports.ADMIN_PASSWORD = _b.ADMIN_PASSWORD;
exports.PAGE_LIMIT = process.env.PAGE_LIMIT ? Number(process.env.PAGE_LIMIT) : 10;
_c = process.env, exports.SENDER_EMAIL_ID = _c.SENDER_EMAIL_ID, exports.SENDER_EMAIL_PASSWORD = _c.SENDER_EMAIL_PASSWORD, exports.MAIL_SERVICE = _c.MAIL_SERVICE, exports.MAIL_HOST = _c.MAIL_HOST, exports.MAIL_PORT = _c.MAIL_PORT, exports.MAIL_SECURE = _c.MAIL_SECURE, exports.SENDER_NAME = _c.SENDER_NAME, exports.COMPANY_ADDRESS = _c.COMPANY_ADDRESS, exports.INFO_EMAIL = _c.INFO_EMAIL, exports.COMPANY_LOGO = _c.COMPANY_LOGO, exports.SUPPORT_EMAIL = _c.SUPPORT_EMAIL;
_d = process.env, exports.UPLOAD_DIAMOND_CRON_INTERVAL = _d.UPLOAD_DIAMOND_CRON_INTERVAL, exports.UPLOAD_DIAMOND_LIMIT = _d.UPLOAD_DIAMOND_LIMIT, exports.FILE_STONE_NUMBER_PREFIX = _d.FILE_STONE_NUMBER_PREFIX, exports.MAITRI_STONE_NUMBER_PREFIX = _d.MAITRI_STONE_NUMBER_PREFIX, exports.MAITRI_AUTH_TOKEN = _d.MAITRI_AUTH_TOKEN, exports.MAITRI_API_URL = _d.MAITRI_API_URL, exports.ANJALI_STONE_NUMBER_PREFIX = _d.ANJALI_STONE_NUMBER_PREFIX, exports.ANJALI_SOURCE_API_URL = _d.ANJALI_SOURCE_API_URL, exports.ANJALI_SOURCE_AUTH_TOKEN = _d.ANJALI_SOURCE_AUTH_TOKEN, exports.ECOSTAR_STONE_NUMBER_PREFIX = _d.ECOSTAR_STONE_NUMBER_PREFIX, exports.ECOSTAR_SOURCE_API_URL = _d.ECOSTAR_SOURCE_API_URL, exports.ECOSTAR_SOURCE_AUTH_TOKEN = _d.ECOSTAR_SOURCE_AUTH_TOKEN, exports.BAPA_SITARAM_SOURCE_API_URL = _d.BAPA_SITARAM_SOURCE_API_URL, exports.BAPA_SITARAM_API_KEY = _d.BAPA_SITARAM_API_KEY, exports.BAPA_SITARAM_STONE_NUMBER_PREFIX = _d.BAPA_SITARAM_STONE_NUMBER_PREFIX, exports.RAPNET_API_CLIENT_ID = _d.RAPNET_API_CLIENT_ID, exports.RAPNET_API_CLIENT_SECRET = _d.RAPNET_API_CLIENT_SECRET, exports.RAPNET_API_GET_TOKEN_URL = _d.RAPNET_API_GET_TOKEN_URL, exports.RAPNET_API_GET_PRICE_LIST = _d.RAPNET_API_GET_PRICE_LIST;
exports.APP_URL = process.env.APP_URL;
exports.INITIAL_ORDER_NUMBER = process.env.INITIAL_ORDER_NUMBER ? Number(process.env.INITIAL_ORDER_NUMBER) - 1 : 0;
exports.ORDER_NUMBER_PREFIX = process.env.ORDER_NUMBER_PREFIX;
//# sourceMappingURL=index.js.map