import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@database';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import responseHandler from './response/response.handler';
import adminRoutes from './routes/adminRoutes/index.routes';
import userRoutes from './routes/userRoutes/index.routes';
import CronService from './services/cron.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private cronService = new CronService();

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeResponseHandler();
    this.initializeRoutes();
    this.cronService.scheduleCrons();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await dbConnection();
      logger.info('Connected to database!');
    } catch (error) {
      logger.error('Error while connecting to database!');
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes() {
    adminRoutes.forEach(route => {
      this.app.use('/api/v1/admin', route.router);
    });
    userRoutes.forEach(route => {
      this.app.use('/api/v1/user', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private initializeResponseHandler() {
    this.app.use(responseHandler);
  }
}

export default App;
