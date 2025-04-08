"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const tslib_1 = require("tslib");
const searchHistory_model_1 = require("../../models/searchHistory.model");
const adminFilters_1 = require("../../utils/filters/adminFilters");
const typedi_1 = require("typedi");
let StatsService = class StatsService {
    constructor() {
        this.getDiamondSearchList = async (getData) => {
            const findCondition = {};
            const fromDate = getData.fromDate;
            const toDate = getData.toDate;
            if (fromDate) {
                fromDate.setHours(0, 0, 0, 0);
                findCondition.createdAt = { $gte: fromDate };
            }
            if (toDate) {
                toDate.setHours(23, 59, 59, 999);
                if (findCondition.createdAt) {
                    findCondition.createdAt.$lte = toDate;
                }
                else {
                    findCondition.createdAt = { $lte: toDate };
                }
            }
            const totalCount = await searchHistory_model_1.SearchHistoryModel.countDocuments(findCondition);
            if (!totalCount || totalCount === 0) {
                return {
                    searchList: [],
                    totalCount: 0,
                    totalPages: 0,
                };
            }
            const searchList = await searchHistory_model_1.SearchHistoryModel.find(findCondition)
                .populate('user', adminFilters_1.filterUserBasicDetailsProjection)
                .sort({ createdAt: -1 })
                .skip(getData.skip)
                .limit(getData.limit);
            return {
                searchList,
                totalCount,
                totalPages: Math.ceil(totalCount / getData.limit),
            };
        };
    }
};
StatsService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map