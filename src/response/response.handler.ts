import { NextFunction, Request, Response } from 'express';
import { CODE_SUCCESS } from './response.codes';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Response {
      success: (message: string, data?: any) => void;
      error: (errorCode: number, message: string, data?: any) => void;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  res.success = (message: string, data?: any) => {
    res.status(CODE_SUCCESS).json({
      responseCode: CODE_SUCCESS,
      data: data,
      message: message,
    });
  };

  res.error = (errorCode: number, message: string, data?: any) => {
    res.status(CODE_SUCCESS).json({
      responseCode: errorCode,
      data: data,
      message: message,
    });
  };
  next();
};
