import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/userAuth.middleware';
import { UserController } from '@/controllers/userControllers/user.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { UpdateUserDto } from '@/dtos/userDtos/user.dto';

export class UserRoute implements Routes {
  public path = '/';
  public router = Router();
  private userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}self`, authMiddleware, this.userController.getUser);
    this.router.put(`${this.path}update-details`, authMiddleware, validationMiddleware(UpdateUserDto), this.userController.editUser);
    this.router.post(`${this.path}change-password`, authMiddleware, this.userController.changePassword);
  }
}
