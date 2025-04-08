import { PAGE_LIMIT } from '@/config';
import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { UserCartService } from '@/services/userServices/cart.service';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class UserCartController {
  private userCartService = Container.get(UserCartService);

  public addToCart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const diamondIds = req.body.itemIds;

      const data = await this.userCartService.addToCart(diamondIds, req.user);

      res.success(ResponseMessages.ADD_TO_CART_SUCCESS, data);
    } catch (error) {
      next(error);
    }
  };

  public deleteCartItem = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const diamondIds = req.body.itemIds;

      await this.userCartService.deleteCartItem(diamondIds, req.user);

      res.success(ResponseMessages.CART_ITEM_DELETE_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public getCartItems = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;

      const data = await this.userCartService.getCartItemList({ skip, limit }, req.user);

      res.success(ResponseMessages.CART_ITEM_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };
}
