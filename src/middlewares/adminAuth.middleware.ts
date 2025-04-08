import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ADMIN_USERNAME, SECRET_KEY } from '@config';
import { HttpException } from '@/exceptions/HttpException';
import { CODE_BAD_REQUEST, CODE_UNAUTHORIZED } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { DataStoredInToken } from '@/interfaces/adminInterfaces/auth.interface';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (!Authorization) {
      next(new HttpException(CODE_BAD_REQUEST, ResponseMessages.MISSING_AUTH_TOKEN));
    }

    const { username } = verify(Authorization, SECRET_KEY) as DataStoredInToken;
    const IS_INVALID_CREDENTIALS = username !== ADMIN_USERNAME;
    if (IS_INVALID_CREDENTIALS) {
      next(new HttpException(CODE_UNAUTHORIZED, ResponseMessages.INVALID_AUTH_TOKEN));
    }

    next();
  } catch (error) {
    next(new HttpException(CODE_UNAUTHORIZED, ResponseMessages.INVALID_AUTH_TOKEN));
  }
};

export default authMiddleware;
