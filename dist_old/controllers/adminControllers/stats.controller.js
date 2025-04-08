"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../../config");
const response_messages_1 = require("../../response/response.messages");
const stats_service_1 = require("../../services/adminServices/stats.service");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class StatsController {
    constructor() {
        this.statsService = typedi_1.default.get(stats_service_1.StatsService);
        this.getDiamondSearchList = async (req, res, next) => {
            try {
                const skip = req.query.skip ? Number(req.query.skip) : 0;
                const limit = req.query.limit ? Number(req.query.limit) : config_1.PAGE_LIMIT;
                const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
                const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;
                const data = await this.statsService.getDiamondSearchList({ skip, limit, fromDate, toDate });
                res.success(response_messages_1.ResponseMessages.DIAMOND_SEARCH_STATS_FOUND, data);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map