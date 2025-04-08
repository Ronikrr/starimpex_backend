import { RequestWithUser } from '@/interfaces/userInterfaces/auth.interface';
import { ResponseMessages } from '@/response/response.messages';
import { CustomerSupportService } from '@/services/userServices/support.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class CustomerSupportController {
  private supportService = Container.get(CustomerSupportService);

  public contactUs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this.supportService.contactUs(data);

      res.success(ResponseMessages.SUPPORT_REQUEST_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public inquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this.supportService.inquiry(data);

      res.success(ResponseMessages.SUPPORT_REQUEST_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public feedback = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this.supportService.feedback(data, req.user);

      res.success(ResponseMessages.FEEDBACK_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public helpSupport = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await this.supportService.helpSupport(data, req.user);

      res.success(ResponseMessages.SUPPORT_REQUEST_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
