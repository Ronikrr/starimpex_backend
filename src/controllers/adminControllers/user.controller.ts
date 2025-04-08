import { PAGE_LIMIT } from '@/config';
import { ResponseMessages } from '@/response/response.messages';
import { UserService } from '@/services/adminServices/user.service';
import { filterUser } from '@/utils/filters/adminFilters';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class UserController {
  private userService = Container.get(UserService);

  public getUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;

      const data = await this.userService.getUserList({ limit, skip });

      res.success(ResponseMessages.USER_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public changeUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const data = req.body;
      const user = await this.userService.changeUserStatus(userId, data);

      res.success(ResponseMessages.USER_UPDATE_SUCCESS, { user: filterUser(user) });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;

      const user = await this.userService.getUser(userId);

      res.success(ResponseMessages.USER_FOUND, filterUser(user));
    } catch (error) {
      next(error);
    }
  };

  public getUserCartHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
      const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;

      const data = await this.userService.getUserCartHistory({ limit, skip, fromDate, toDate });

      res.success(ResponseMessages.CART_ITEM_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getUserPriceTrackHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const fromDate = req.query.fromDate ? new Date(String(req.query.fromDate)) : null;
      const toDate = req.query.toDate ? new Date(String(req.query.toDate)) : null;

      const data = await this.userService.getUserPriceTrackHistory({ limit, skip, fromDate, toDate });

      res.success(ResponseMessages.PRICE_TRACK_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const data = req.body;
      const user = await this.userService.changePassword(userId, data);

      res.success(ResponseMessages.CHANGE_PASSWORD_SUCCESS, filterUser(user));
    } catch (error) {
      next(error);
    }
  };
}
