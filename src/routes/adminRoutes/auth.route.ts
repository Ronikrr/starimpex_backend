import { Router } from 'express';
import { AuthController } from '@controllers/adminControllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { LoginDto, LogoutDto } from '@/dtos/adminDtos/auth.dto';
import authMiddleware from '@/middlewares/adminAuth.middleware';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware, validationMiddleware(LogoutDto), this.authController.logout);
  }
}
