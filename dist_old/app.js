"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const _config_1 = require("./config");
const _database_1 = require("./database");
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_1 = require("./utils/logger");
const response_handler_1 = tslib_1.__importDefault(require("./response/response.handler"));
const index_routes_1 = tslib_1.__importDefault(require("./routes/adminRoutes/index.routes"));
const index_routes_2 = tslib_1.__importDefault(require("./routes/userRoutes/index.routes"));
const cron_service_1 = tslib_1.__importDefault(require("./services/cron.service"));
class App {
    constructor() {
        this.cronService = new cron_service_1.default();
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || 'development';
        this.port = _config_1.PORT || 3000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeResponseHandler();
        this.initializeRoutes();
        this.cronService.scheduleCrons();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    async connectToDatabase() {
        try {
            await (0, _database_1.dbConnection)();
            logger_1.logger.info('Connected to database!');
        }
        catch (error) {
            logger_1.logger.error('Error while connecting to database!');
        }
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(_config_1.LOG_FORMAT, { stream: logger_1.stream }));
        this.app.use((0, cors_1.default)({ origin: _config_1.ORIGIN, credentials: _config_1.CREDENTIALS }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes() {
        index_routes_1.default.forEach(route => {
            this.app.use('/api/v1/admin', route.router);
        });
        index_routes_2.default.forEach(route => {
            this.app.use('/api/v1/user', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.ErrorMiddleware);
    }
    initializeResponseHandler() {
        this.app.use(response_handler_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map