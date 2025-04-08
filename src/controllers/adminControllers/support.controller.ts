import { PAGE_LIMIT } from '@/config';
import { ResponseMessages } from '@/response/response.messages';
import { SupportService } from '@/services/adminServices/support.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class SupportController {
  private supportService = Container.get(SupportService);

  public getContactList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const search = req.query?.search ? String(req.query.search).toLowerCase() : null;
      const status = req.query?.status ? String(req.query.status) : null;

      const data = await this.supportService.getContactList({ limit, skip, search, status });

      res.success(ResponseMessages.CONTACT_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getInquiryList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const search = req.query?.search ? String(req.query.search).toLowerCase() : null;
      const status = req.query?.status ? String(req.query.status) : null;

      const data = await this.supportService.getInquiryList({ limit, skip, search, status });

      res.success(ResponseMessages.INQUIRY_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getFeedbackList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const user = req.query?.user ? String(req.query.user) : null;

      const data = await this.supportService.getFeedbackList({ limit, skip, user });

      res.success(ResponseMessages.FEEDBACK_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public getHelpSupportList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query?.limit ? Number(req.query.limit) : PAGE_LIMIT;
      const skip = req.query?.skip ? Number(req.query.skip) : 0;
      const user = req.query?.user ? String(req.query.user) : null;
      const status = req.query?.status ? String(req.query.status) : null;

      const data = await this.supportService.getHelpSupportList({ limit, skip, status, user });

      res.success(ResponseMessages.CUSTOMER_QUERY_LIST_FOUND, data);
    } catch (error) {
      next(error);
    }
  };

  public changeContactStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id ? String(req.params.id) : null;
      await this.supportService.changeContactStatus(req.body, id);

      res.success(ResponseMessages.CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public changeInquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id ? String(req.params.id) : null;
      await this.supportService.changeInquiryStatus(req.body, id);

      res.success(ResponseMessages.CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  public changeHelpSupportStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id ? String(req.params.id) : null;
      await this.supportService.changeHelpSupportStatus(req.body, id);

      res.success(ResponseMessages.CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS);
    } catch (error) {
      next(error);
    }
  };
}
