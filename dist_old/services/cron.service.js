"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../config");
const diamonds_interface_1 = require("../interfaces/diamonds.interface");
const diamondSources_model_1 = require("../models/diamondSources.model");
const diamondSources_1 = require("../utils/diamondSources");
const logger_1 = require("../utils/logger");
const node_schedule_1 = tslib_1.__importDefault(require("node-schedule"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const node_http_1 = tslib_1.__importDefault(require("node:http"));
const node_https_1 = tslib_1.__importDefault(require("node:https"));
const maitriParser_1 = require("../utils/parser/maitriParser");
const diamonds_model_1 = require("../models/diamonds.model");
const cart_model_1 = require("../models/cart.model");
const priceTracker_model_1 = require("../models/priceTracker.model");
const anjaliParser_1 = require("../utils/parser/anjaliParser");
const ecostarParser_1 = require("../utils/parser/ecostarParser");
const bapaSitaramParser_1 = require("../utils/parser/bapaSitaramParser");
const rapPrice_model_1 = require("../models/rapPrice.model");
const rapnetPriceList_1 = require("../utils/rapnetPriceList");
const rapnetPriceListParser_1 = require("../utils/parser/rapnetPriceListParser");
const cron_time_generator_1 = require("cron-time-generator");
class CronService {
    constructor() {
        this.updateMaitriDiamonds = async (markupPercentage = 0) => {
            let isEmpty = false;
            let page = 1;
            const allUniqueStoneId = [];
            do {
                logger_1.logger.info('FETCH DIAMONDS FROM MAITRI >>>>>> ');
                logger_1.logger.info(`Page: ${page}`);
                const data = await this.fetchMaitriDataApi(Object.assign({}, (0, diamondSources_1.maitriRequestData)(page)));
                isEmpty = !data || (data === null || data === void 0 ? void 0 : data.length) === 0;
                if (!isEmpty) {
                    logger_1.logger.info(`PARSING MAITRI DATA Page: ${page} >>> `);
                    const parsedData = (0, maitriParser_1.parseMaitriData)(data, diamonds_interface_1.ESourceType.MAITRI, markupPercentage);
                    for (const diamondData of parsedData) {
                        const { uniqueStoneId } = diamondData, otherData = tslib_1.__rest(diamondData, ["uniqueStoneId"]);
                        allUniqueStoneId.push(uniqueStoneId);
                        await diamonds_model_1.DiamondModel.updateOne({ uniqueStoneId: uniqueStoneId }, {
                            $set: otherData,
                        }, { upsert: true, new: true });
                    }
                    page += 1;
                }
            } while (!isEmpty);
            if (allUniqueStoneId.length) {
                await diamonds_model_1.DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: diamonds_interface_1.ESourceType.MAITRI });
                await cart_model_1.CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.MAITRI });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.MAITRI }, { $set: { status: diamonds_interface_1.EDiamondStatus.SOLD } });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.MAITRI }, { $set: { status: diamonds_interface_1.EDiamondStatus.AVAILABLE } });
                logger_1.logger.info(`MAITRI DIAMONDS UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
            }
            else {
                logger_1.logger.info('No Available Diamonds found');
            }
        };
        this.updateAnjaliDiamonds = async (markupPercentage = 0) => {
            const allUniqueStoneId = [];
            logger_1.logger.info('FETCH DIAMONDS FROM ANJALI >>>>>> ');
            const data = await this.fetchAnjaliDataApi(Object.assign({}, (0, diamondSources_1.anjaliRequestData)()));
            const isEmpty = !data || (data === null || data === void 0 ? void 0 : data.length) === 0;
            if (isEmpty) {
                return;
            }
            logger_1.logger.info(`PARSING ANJALI DATA >>> `);
            const parsedData = (0, anjaliParser_1.parseAnjaliData)(data, diamonds_interface_1.ESourceType.ANJALI, markupPercentage);
            for (const diamondData of parsedData) {
                const { uniqueStoneId } = diamondData, otherData = tslib_1.__rest(diamondData, ["uniqueStoneId"]);
                allUniqueStoneId.push(uniqueStoneId);
                await diamonds_model_1.DiamondModel.updateOne({ uniqueStoneId: uniqueStoneId }, {
                    $set: otherData,
                }, { upsert: true, new: true });
            }
            if (allUniqueStoneId.length) {
                await diamonds_model_1.DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: diamonds_interface_1.ESourceType.ANJALI });
                await cart_model_1.CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.ANJALI });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.ANJALI }, { $set: { status: diamonds_interface_1.EDiamondStatus.SOLD } });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.ANJALI }, { $set: { status: diamonds_interface_1.EDiamondStatus.AVAILABLE } });
                logger_1.logger.info(`ANJALI DIAMONDS UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
            }
            else {
                logger_1.logger.info('No Available Diamonds found');
            }
        };
        this.updateEcoStarDiamonds = async (markupPercentage = 0) => {
            const allUniqueStoneId = [];
            logger_1.logger.info('FETCH DIAMONDS FROM ECO STAR >>>>>> ');
            const data = await this.fetchEcoStarDataApi(Object.assign({}, (0, diamondSources_1.ecoStarRequestData)()));
            const isEmpty = !data || (data === null || data === void 0 ? void 0 : data.length) === 0;
            if (isEmpty) {
                return;
            }
            logger_1.logger.info(`PARSING ECO STAR DATA >>> `);
            const parsedData = await (0, ecostarParser_1.parseEcoStarData)(data, diamonds_interface_1.ESourceType.ECOSTAR, markupPercentage);
            for (const diamondData of parsedData) {
                const { uniqueStoneId } = diamondData, otherData = tslib_1.__rest(diamondData, ["uniqueStoneId"]);
                allUniqueStoneId.push(uniqueStoneId);
                await diamonds_model_1.DiamondModel.updateOne({ uniqueStoneId: uniqueStoneId }, {
                    $set: otherData,
                }, { upsert: true, new: true });
            }
            if (allUniqueStoneId.length) {
                await diamonds_model_1.DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: diamonds_interface_1.ESourceType.ECOSTAR });
                await cart_model_1.CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.ECOSTAR });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.ECOSTAR }, { $set: { status: diamonds_interface_1.EDiamondStatus.SOLD } });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.ECOSTAR }, { $set: { status: diamonds_interface_1.EDiamondStatus.AVAILABLE } });
                logger_1.logger.info(`ECOSTAR DIAMONDS UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
            }
            else {
                logger_1.logger.info('No Available Diamonds found');
            }
        };
        this.updateBapaSitaramDiamonds = async (markupPercentage = 0) => {
            const allUniqueStoneId = [];
            logger_1.logger.info('FETCH DIAMONDS FROM BAPA SITARAM >>>>>> ');
            const data = await this.fetchBapaSitaramDiamondsDataApi(Object.assign({}, (0, diamondSources_1.bapaSitaramRequestData)()));
            const isEmpty = !data || (data === null || data === void 0 ? void 0 : data.length) === 0;
            if (isEmpty) {
                return;
            }
            logger_1.logger.info(`PARSING BAPA SITARAM DATA >>> `);
            const parsedData = (0, bapaSitaramParser_1.parseBapaSitaramData)(data, diamonds_interface_1.ESourceType.BAPA_SITARAM, markupPercentage);
            for (const diamondData of parsedData) {
                const { uniqueStoneId } = diamondData, otherData = tslib_1.__rest(diamondData, ["uniqueStoneId"]);
                allUniqueStoneId.push(uniqueStoneId);
                await diamonds_model_1.DiamondModel.updateOne({ uniqueStoneId: uniqueStoneId }, {
                    $set: otherData,
                }, { upsert: true, new: true });
            }
            if (allUniqueStoneId.length) {
                await diamonds_model_1.DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: diamonds_interface_1.ESourceType.BAPA_SITARAM });
                await cart_model_1.CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.BAPA_SITARAM });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.BAPA_SITARAM }, { $set: { status: diamonds_interface_1.EDiamondStatus.SOLD } });
                await priceTracker_model_1.PriceTrackerModel.updateMany({ 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': diamonds_interface_1.ESourceType.BAPA_SITARAM }, { $set: { status: diamonds_interface_1.EDiamondStatus.AVAILABLE } });
                logger_1.logger.info(`BAPA SITARAM UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
            }
            else {
                logger_1.logger.info('No Available Diamonds found');
            }
        };
        this.fetchMaitriDataApi = async (requestData) => {
            var _a, _b;
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };
                if (requestData === null || requestData === void 0 ? void 0 : requestData.token) {
                    headers.Authorization = requestData.token;
                }
                const httpAgent = new node_http_1.default.Agent({
                    keepAlive: true,
                });
                const httpsAgent = new node_https_1.default.Agent({
                    keepAlive: true,
                });
                const response = await (0, node_fetch_1.default)(requestData.apiURL, {
                    method: requestData.method,
                    body: JSON.stringify(requestData.data),
                    headers,
                    agent: function (_parsedURL) {
                        if (_parsedURL.protocol == 'http:') {
                            return httpAgent;
                        }
                        else {
                            return httpsAgent;
                        }
                    },
                });
                const data = await response.json();
                if (data && (data === null || data === void 0 ? void 0 : data.StatusCode) === 200) {
                    logger_1.logger.info(`Total records: ${(_a = JSON.parse(data.Data)) === null || _a === void 0 ? void 0 : _a.TotalRecords}`);
                    return ((_b = JSON.parse(data.Data)) === null || _b === void 0 ? void 0 : _b.ViPacketListForAPIResult) || [];
                }
                logger_1.logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
            }
            catch (error) {
                logger_1.logger.error('>>> Error while fetching data');
                logger_1.logger.error(error);
            }
            return null;
        };
        this.fetchAnjaliDataApi = async (requestData) => {
            try {
                const searchParams = new URLSearchParams({
                    APIToken: requestData.token,
                }).toString();
                const response = await (0, node_fetch_1.default)(`${requestData.apiURL}?` + searchParams, {
                    method: requestData.method,
                });
                const data = await response.json();
                if (data && (data === null || data === void 0 ? void 0 : data.ApiStatus) === 'Success') {
                    logger_1.logger.info(`Total records: ${data.StoneList.length}`);
                    return (data === null || data === void 0 ? void 0 : data.StoneList) || [];
                }
                logger_1.logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
            }
            catch (error) {
                logger_1.logger.error('>>> Error while fetching data');
                logger_1.logger.error(error);
            }
            return null;
        };
        this.fetchEcoStarDataApi = async (requestData) => {
            var _a;
            try {
                const searchParams = new URLSearchParams();
                requestData.params.forEach(param => {
                    searchParams.set(param.key, param.value);
                });
                const response = await (0, node_fetch_1.default)(`${requestData.apiURL}?` + searchParams, {
                    method: requestData.method,
                });
                const data = await response.json();
                if (data && (data === null || data === void 0 ? void 0 : data.success) === 1) {
                    logger_1.logger.info(`Total records: ${(_a = data.data) === null || _a === void 0 ? void 0 : _a.length}`);
                    return (data === null || data === void 0 ? void 0 : data.data) || [];
                }
                logger_1.logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
            }
            catch (error) {
                logger_1.logger.error('>>> Error while fetching data');
                logger_1.logger.error(error);
            }
            return null;
        };
        this.fetchBapaSitaramDiamondsDataApi = async (requestData) => {
            try {
                const searchParams = new URLSearchParams();
                requestData.params.forEach(param => {
                    searchParams.set(param.key, param.value);
                });
                const response = await (0, node_fetch_1.default)(`${requestData.apiURL}?` + searchParams.toString(), {
                    method: requestData.method,
                });
                const data = await response.json();
                if (data) {
                    logger_1.logger.info(`Total records: ${(data === null || data === void 0 ? void 0 : data.length) || 0}`);
                    return data || [];
                }
                logger_1.logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
            }
            catch (error) {
                logger_1.logger.error('>>> Error while fetching data');
                logger_1.logger.error(error);
            }
            return null;
        };
    }
    async scheduleCrons() {
        node_schedule_1.default.scheduleJob(config_1.UPLOAD_DIAMOND_CRON_INTERVAL, async () => {
            logger_1.logger.info('Running Cron Scheduler : UPLOAD DIAMOND VIA API >>>>>> ');
            try {
                await this.uploadDiamondsViaAPIs();
                logger_1.logger.info('Cron Scheduler : UPLOAD DIAMOND VIA API COMPLETED >>>>>> ');
            }
            catch (error) {
                logger_1.logger.error('Cron Scheduler : Error while running Upload diamond cron scheduler');
                logger_1.logger.error(error);
            }
        });
        node_schedule_1.default.scheduleJob(cron_time_generator_1.CronTime.onSpecificDaysAt(['friday'], 9, 35), async () => {
            try {
                logger_1.logger.info('Running Cron Scheduler : UPDATE RAPAPORT PRICE >>>>>> ');
                await this.updateRapPriceList();
                logger_1.logger.info('Running Cron Scheduler : UPDATE RAPAPORT PRICE COMPLETED >>>>>> ');
            }
            catch (error) {
                logger_1.logger.error(`ERROR WHILE RUNNING UPDATE RAP LIST FROM RAPNET API cron scheduler: ${error}`);
            }
        });
    }
    async updateRapPriceList() {
        try {
            logger_1.logger.info('UPDATE RAP LIST FROM RAPNET API >>>>>> ');
            const token = await (0, rapnetPriceList_1.getRapNetApiAccessToken)();
            if (!token) {
                logger_1.logger.error('Rap API Get Access Token Error : No Token Found');
                return;
            }
            const todayDate = new Date();
            const rapPriceList = [];
            const rapNetShapeList = ['round', 'pear'];
            for (let index = 0; index < rapNetShapeList.length; index++) {
                const shape = rapNetShapeList[index];
                const data = await (0, rapnetPriceList_1.getRapNetPriceList)(shape, token);
                if (!data || data.length === 0) {
                    logger_1.logger.error(`RAPNET PRICE LIST NOT FOUND >>> SHAPE : ${shape}`);
                }
                rapPriceList.push(...data);
            }
            logger_1.logger.info(`RAP PRICE LIST COUNT >>> ${rapPriceList.length}`);
            const parsedData = (0, rapnetPriceListParser_1.parseRapNetPriceListData)(rapPriceList);
            try {
                await rapPrice_model_1.RapPriceModel.insertMany(parsedData);
                await rapPrice_model_1.RapPriceModel.deleteMany({ createdAt: { $lt: todayDate } });
                logger_1.logger.info('UPDATE RAP LIST FROM RAPNET API COMPLETED>>>>>> ');
            }
            catch (error) {
                logger_1.logger.error(`ERROR WHILE INSERTING RAP LIST >>> ${error}`);
            }
        }
        catch (error) {
            logger_1.logger.error(`ERROR WHILE UPDATING RAP PRICE LIST >>> ${error}`);
        }
    }
    async uploadDiamondsViaAPIs() {
        const sources = await diamondSources_model_1.DiamondSourceModel.find({ isDisabled: false, sourceType: { $ne: diamonds_interface_1.ESourceType.FILE } });
        if (!sources || sources.length === 0) {
            logger_1.logger.info('NO SOURCES AVAILABLE >>>>>> ');
            return;
        }
        for (let i = 0; i < sources.length; i++) {
            switch (sources[i].sourceType) {
                case diamonds_interface_1.ESourceType.MAITRI:
                    await this.updateMaitriDiamonds(sources[i].markupPercentage);
                    break;
                case diamonds_interface_1.ESourceType.ANJALI:
                    await this.updateAnjaliDiamonds(sources[i].markupPercentage);
                    break;
                case diamonds_interface_1.ESourceType.ECOSTAR:
                    const isRapListAvailable = await (0, rapnetPriceList_1.checkRapNetPriceListAvailable)();
                    if (!isRapListAvailable) {
                        await this.updateRapPriceList();
                    }
                    await this.updateEcoStarDiamonds(sources[i].markupPercentage);
                    break;
                case diamonds_interface_1.ESourceType.BAPA_SITARAM:
                    await this.updateBapaSitaramDiamonds(sources[i].markupPercentage);
                    break;
            }
        }
    }
}
exports.default = CronService;
//# sourceMappingURL=cron.service.js.map