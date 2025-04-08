import { ResponseMessages } from '@/response/response.messages';
import { AuthService } from '@/services/adminServices/auth.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class AuthController {
  private authService = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const token = await this.authService.login(data);

      res.success(ResponseMessages.LOGIN_SUCCESS, { token });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.body);

      res.success(ResponseMessages.LOGOUT_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
