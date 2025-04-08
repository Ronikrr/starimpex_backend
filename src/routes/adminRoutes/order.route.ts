import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ExportOrdersExcelDto, GetOrderListDto } from '@/dtos/order.dto';
import { ParamsObjectIdDto } from '@/dtos/common.dto';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import { OrderController } from '@/controllers/adminControllers/order.controller';
import { ChangeOrderStatusDto, CreateManualOrderDto, OrderAdditionChargesDto } from '@/dtos/adminDtos/order.dto';

export class OrderRoute implements Routes {
  public path = '/order';
  public router = Router();
  private orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, validationMiddleware(GetOrderListDto, 'query'), this.orderController.getOrderList);
    this.router.get(
      `${this.path}/details/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      this.orderController.getOrderDetails,
    );
    this.router.put(
      `${this.path}/change-status/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(ChangeOrderStatusDto),
      this.orderController.changeOrderStatus,
    );
    this.router.put(
      `${this.path}/additional-charges/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(OrderAdditionChargesDto),
      this.orderController.updateAdditionalCharges,
    );
    this.router.post(`${this.path}/manual/add`, authMiddleware, validationMiddleware(CreateManualOrderDto), this.orderController.createOrder);
    this.router.put(
      `${this.path}/manual/update/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(CreateManualOrderDto),
      this.orderController.updateOrder,
    );
    this.router.post(`${this.path}/export`, authMiddleware, validationMiddleware(ExportOrdersExcelDto), this.orderController.exportOrdersExcel);
    this.router.get(`${this.path}/order-items/:orderNumber`, authMiddleware, this.orderController.getOrderItems);
  }
}
