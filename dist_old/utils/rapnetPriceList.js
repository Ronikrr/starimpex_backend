"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRapNetPriceListAvailable = exports.getRapNetPriceList = exports.getRapNetApiAccessToken = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const logger_1 = require("./logger");
const rapPrice_model_1 = require("../models/rapPrice.model");
const getRapNetApiAccessToken = async () => {
    try {
        const response = await (0, node_fetch_1.default)(config_1.RAPNET_API_GET_TOKEN_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: config_1.RAPNET_API_CLIENT_ID,
                client_secret: config_1.RAPNET_API_CLIENT_SECRET,
            }),
        });
        const data = await response.json();
        return data === null || data === void 0 ? void 0 : data.access_token;
    }
    catch (error) {
        logger_1.logger.error(`Error while getting rap api access token >>>> ${error}`);
        return '';
    }
};
exports.getRapNetApiAccessToken = getRapNetApiAccessToken;
const getRapNetPriceList = async (shape, token) => {
    if (!token || !shape) {
        logger_1.logger.info('Fetch Rap List >>> token or shape missing');
        return;
    }
    try {
        const response = await (0, node_fetch_1.default)(`${config_1.RAPNET_API_GET_PRICE_LIST}?shape=${shape}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        logger_1.logger.info(`>>> Shape : ${shape}, Total records : ${data === null || data === void 0 ? void 0 : data.length}`);
        if (!data || (data === null || data === void 0 ? void 0 : data.length) === 0) {
            return [];
        }
        return data;
    }
    catch (error) {
        logger_1.logger.error(`Error while getting rap api access token >>>> ${error}`);
        return [];
    }
};
exports.getRapNetPriceList = getRapNetPriceList;
const checkRapNetPriceListAvailable = async () => {
    const count = await rapPrice_model_1.RapPriceModel.countDocuments();
    return count && count > 0;
};
exports.checkRapNetPriceListAvailable = checkRapNetPriceListAvailable;
//# sourceMappingURL=rapnetPriceList.js.map