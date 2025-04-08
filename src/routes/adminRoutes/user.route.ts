import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { UserController } from '@/controllers/adminControllers/user.controller';
import {
  ChangeUserPasswordDto,
  ChangeUserStatusDto,
  GetCartHistoryListDto,
  GetPriceTrackHistoryListDto,
  GetUserListDto,
} from '@/dtos/adminDtos/user.dto';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { ParamsObjectIdDto } from '@/dtos/common.dto';

export class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetUserListDto, 'query'), this.userController.getUserList);
    this.router.put(
      `${this.path}/change-status/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(ChangeUserStatusDto),
      this.userController.changeUserStatus,
    );
    this.router.get(
      `${this.path}/cart-history`,
      authMiddleware,
      validationMiddleware(GetCartHistoryListDto, 'query'),
      this.userController.getUserCartHistory,
    );
    this.router.get(
      `${this.path}/price-track-history`,
      authMiddleware,
      validationMiddleware(GetPriceTrackHistoryListDto, 'query'),
      this.userController.getUserPriceTrackHistory,
    );
    this.router.get(`${this.path}/:id`, authMiddleware, validationMiddleware(ParamsObjectIdDto, 'params'), this.userController.getUser);
    this.router.put(
      `${this.path}/change-password/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(ChangeUserPasswordDto),
      this.userController.changePassword,
    );
  }
}
