import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateUserDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto } from '@/dtos/userDtos/auth.dto';
import { AuthController } from '@/controllers/userControllers/auth.controller';
import authMiddleware from '@/middlewares/userAuth.middleware';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto), this.authController.signIn);
    this.router.get(`${this.path}/logout`, authMiddleware, this.authController.logout);
    this.router.post(`${this.path}/forgot-password`, validationMiddleware(ForgotPasswordDto), this.authController.forgotPassword);
    this.router.post(`${this.path}/reset-password`, validationMiddleware(ResetPasswordDto), this.authController.resetPassword);
  }
}
