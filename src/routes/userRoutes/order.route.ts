import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/userAuth.middleware';
import { OrderController } from '@/controllers/userControllers/order.controller';
import { CreateOrderDto } from '@/dtos/userDtos/order.dto';
import { ExportOrdersExcelDto, GetOrderListDto } from '@/dtos/order.dto';
import { ParamsObjectIdDto } from '@/dtos/common.dto';

export class OrderRoute implements Routes {
  public path = '/order';
  public router = Router();
  private orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, validationMiddleware(CreateOrderDto), this.orderController.createOrder);
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetOrderListDto, 'query'), this.orderController.getOrderList);
    this.router.get(
      `${this.path}/details/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      this.orderController.getOrderDetails,
    );
    this.router.post(`${this.path}/export`, authMiddleware, validationMiddleware(ExportOrdersExcelDto), this.orderController.exportOrdersExcel);
  }
}
