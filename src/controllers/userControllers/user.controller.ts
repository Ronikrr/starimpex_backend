import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { UserService } from '@/services/userServices/user.service';
import { filterUser } from '@/utils/filters/userFilters';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class UserController {
  private userService = Container.get(UserService);

  public getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.success(ResponseMessages.USER_FOUND, filterUser(req.user));
    } catch (error) {
      next(error);
    }
  };

  public editUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userService.editUser(req.body, req.user);

      res.success(ResponseMessages.USER_PROFILE_UPDATE_SUCCESS, filterUser(updatedUser));
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.userService.changePassword(req.user);

      res.success(ResponseMessages.SEND_EMAIL_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
