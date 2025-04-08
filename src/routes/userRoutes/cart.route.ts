import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/userAuth.middleware';
import { UserCartController } from '@/controllers/userControllers/cart.controller';
import { AddToCartDto, DeleteFromCartDto, GetCartItemListDto } from '@/dtos/userDtos/cart.dto';

export class UserCartRoute implements Routes {
  public path = '/cart';
  public router = Router();
  private userCartController = new UserCartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add`, authMiddleware, validationMiddleware(AddToCartDto), this.userCartController.addToCart);
    this.router.delete(`${this.path}/remove`, authMiddleware, validationMiddleware(DeleteFromCartDto), this.userCartController.deleteCartItem);
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetCartItemListDto, 'query'), this.userCartController.getCartItems);
  }
}
