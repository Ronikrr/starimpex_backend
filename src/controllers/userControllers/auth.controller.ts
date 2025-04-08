import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@/services/userServices/auth.service';
import { ResponseMessages } from '@/response/response.messages';
import { filterUser } from '@/utils/filters/userFilters';
import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';

export class AuthController {
  private authService = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      await this.authService.signUp(userData);

      res.success(ResponseMessages.SIGNUP_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCredentials = req.body;
      const userData = await this.authService.signIn(userCredentials);

      const { token, ...user } = filterUser(userData);

      res.success(ResponseMessages.LOGIN_SUCCESS, { user, token });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.user);

      res.success(ResponseMessages.LOGOUT_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this.authService.forgotPassword(data);

      res.success(ResponseMessages.SEND_EMAIL_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this.authService.resetPassword(data);

      res.success(ResponseMessages.CHANGE_PASSWORD_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
