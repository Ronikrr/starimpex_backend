import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@utils/logger';
import { ResponseMessages } from '@/response/response.messages';
import { CODE_INTERNAL_SERVER_ERROR } from '@/response/response.codes';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || CODE_INTERNAL_SERVER_ERROR;
    const message: string = error.message || ResponseMessages.SOMETHING_WENT_WRONG;
    const data: any = error.data || null;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    if (status === 500) {
      logger.error(error.stack);
    }

    const response: any = { responseCode: status, message };
    if (data) {
      response.data = data;
    }
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};
