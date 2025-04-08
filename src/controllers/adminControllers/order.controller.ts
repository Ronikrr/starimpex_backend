import { PAGE_LIMIT } from '@/config';
import { ResponseMessages } from '@/response/response.messages';
import { UserOrderService } from '@/services/adminServices/order.service';
import { CommonOrderService } from '@/services/order.service';
import { filterOrder } from '@/utils/filters/adminFilters';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class OrderController {
  private commonOrderService = Container.get(CommonOrderService);
  private userOrderService = Container.get(UserOrderService);

  public getOrderList = async (req: Request, res: Response, next: NextFunction) => {
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

      const data = await this.commonOrderService.getOrderList({
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
      });

      res.success(ResponseMessages.ORDER_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id ? String(req.params.id) : null;
      const { order, ...otherData } = await this.commonOrderService.getOrderDetails(orderId);

      res.success(ResponseMessages.ORDER_FOUND, { ...filterOrder(order), ...otherData });
    } catch (error) {
      next(error);
    }
  };

  public changeOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id ? String(req.params.id) : null;
      const data = await this.userOrderService.changeOrderStatus(req.body, orderId);

      res.success(ResponseMessages.ORDER_STATUS_CHANGE_SUCCESS, filterOrder(data));
    } catch (error) {
      next(error);
    }
  };

  public updateAdditionalCharges = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id ? String(req.params.id) : null;
      const data = await this.userOrderService.updateAdditionalCharges(req.body, orderId);

      res.success(ResponseMessages.ORDER_UPDATE_ADDITIONAL_CHARGES_SUCCESS, filterOrder(data));
    } catch (error) {
      next(error);
    }
  };

  public exportOrdersExcel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderIds = req.body.orderIds;
      const buffer = await this.commonOrderService.exportOrdersExcel(orderIds);

      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  };

  public getOrderItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderNumber = req.params.orderNumber ? String(req.params.orderNumber) : null;
      const orderItems = await this.userOrderService.getOrderItems(orderNumber);

      res.success(ResponseMessages.ORDER_FOUND, { orderItems: orderItems });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const orderData = await this.userOrderService.createOrder(data);

      res.success(`#${orderData.orderNumber} ${ResponseMessages.ORDER_CREATE_SUCCESS}`, filterOrder(orderData));
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.id;
      const data = req.body;
      const orderData = await this.userOrderService.updateOrder(data, orderId);

      res.success(ResponseMessages.ORDER_UPDATE_SUCCESS, filterOrder(orderData));
    } catch (error) {
      next(error);
    }
  };
}
