import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { SupportController } from '@/controllers/adminControllers/support.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import {
  ChangeSupportRequestStatusDto,
  GetContactListDto,
  GetFeedbackListDto,
  GetHelpSupportListDto,
  GetInquiryListDto,
} from '@/dtos/adminDtos/support.dto';
import authMiddleware from '@/middlewares/adminAuth.middleware';
import { ParamsObjectIdDto } from '@/dtos/common.dto';

export class SupportRoute implements Routes {
  public path = '/support';
  public router = Router();
  private supportController = new SupportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/contact/list`,
      authMiddleware,
      validationMiddleware(GetContactListDto, 'query'),
      this.supportController.getContactList,
    );
    this.router.get(
      `${this.path}/inquiry/list`,
      authMiddleware,
      validationMiddleware(GetInquiryListDto, 'query'),
      this.supportController.getInquiryList,
    );
    this.router.get(
      `${this.path}/feedback/list`,
      authMiddleware,
      validationMiddleware(GetFeedbackListDto, 'query'),
      this.supportController.getFeedbackList,
    );
    this.router.get(
      `${this.path}/help/list`,
      authMiddleware,
      validationMiddleware(GetHelpSupportListDto, 'query'),
      this.supportController.getHelpSupportList,
    );
    this.router.put(
      `${this.path}/contact/change-status/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(ChangeSupportRequestStatusDto),
      this.supportController.changeContactStatus,
    );
    this.router.put(
      `${this.path}/inquiry/change-status/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(ChangeSupportRequestStatusDto),
      this.supportController.changeInquiryStatus,
    );
    this.router.put(
      `${this.path}/help/change-status/:id`,
      authMiddleware,
      validationMiddleware(ParamsObjectIdDto, 'params'),
      validationMiddleware(ChangeSupportRequestStatusDto),
      this.supportController.changeHelpSupportStatus,
    );
  }
}
