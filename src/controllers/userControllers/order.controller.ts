import { PAGE_LIMIT } from '@/config';
import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { CommonOrderService } from '@/services/order.service';
import { OrderService } from '@/services/userServices/order.service';
import { filterOrder } from '@/utils/filters/userFilters';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class OrderController {
  private orderService = Container.get(OrderService);
  private commonOrderService = Container.get(CommonOrderService);

  public createOrder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.orderService.createOrder(req.body, req.user);

      res.success(ResponseMessages.ORDER_CREATED_SUCCESSFULLY);
    } catch (error) {
      next(error);
    }
  };

  public getOrderList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const orderNumber = req.query.orderNumber ? String(req.query.orderNumber) : null;
      const fromOrderDate = req.query.fromOrderDate ? new Date(String(req.query.fromOrderDate)) : null;
      const toOrderDate = req.query.toOrderDate ? new Date(String(req.query.toOrderDate)) : null;
      const fromAmount = req.query.fromAmount ? Number(req.query.fromAmount) : null;
      const toAmount = req.query.toAmount ? Number(req.query.toAmount) : null;
      const fromTotalItems = req.query.fromTotalItems ? Number(req.query.fromTotalItems) : null;
      const toTotalItems = req.query.toTotalItems ? Number(req.query.toTotalItems) : null;
      const fromCarats = req.query.fromCarats ? Number(req.query.fromCarats) : null;
      const toCarats = req.query.toCarats ? Number(req.query.toCarats) : null;

      const data = await this.commonOrderService.getOrderList(
        {
          skip,
          limit,
          orderNumber,
          fromOrderDate,
          toOrderDate,
          fromAmount,
          toAmount,
          fromTotalItems,
          toTotalItems,
          fromCarats,
          toCarats,
        },
        req.user,
      );
      res.success(ResponseMessages.ORDER_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getOrderDetails = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id ? String(req.params.id) : null;
      const { order, ...otherData } = await this.commonOrderService.getOrderDetails(orderId, req.user);

      res.success(ResponseMessages.ORDER_FOUND, { ...filterOrder(order, otherData) });
    } catch (error) {
      next(error);
    }
  };

  public exportOrdersExcel = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const orderIds = req.body.orderIds;
      const buffer = await this.commonOrderService.exportOrdersExcel(orderIds, req.user);

      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };
}
