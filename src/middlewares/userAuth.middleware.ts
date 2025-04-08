import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { UserModel } from '@models/users.model';
import { EUserStatus } from '@/interfaces/users.interface';
import { CODE_BAD_REQUEST, CODE_UNAUTHORIZED } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (!Authorization) {
      next(new HttpException(CODE_BAD_REQUEST, ResponseMessages.MISSING_AUTH_TOKEN));
    }

    const { _id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
    const findUser = await UserModel.findOne({ _id });

    if (!findUser || findUser.status !== EUserStatus.APPROVED) {
      next(new HttpException(CODE_UNAUTHORIZED, ResponseMessages.INVALID_AUTH_TOKEN));
    }

    req.user = findUser;
    next();
  } catch (error) {
    next(new HttpException(CODE_UNAUTHORIZED, ResponseMessages.INVALID_AUTH_TOKEN));
  }
};

export default authMiddleware;
