import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CustomerSupportController } from '@/controllers/userControllers/support.controller';
import { ContactUsDto, FeedbackDto, HelpSupportDto, InquiryDto } from '@/dtos/userDtos/support.dto';
import authMiddleware from '@/middlewares/userAuth.middleware';

export class CustomerSupportRoute implements Routes {
  public path = '/support';
  public router = Router();
  private supportController = new CustomerSupportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/contact`, validationMiddleware(ContactUsDto), this.supportController.contactUs);
    this.router.post(`${this.path}/inquiry`, validationMiddleware(InquiryDto), this.supportController.inquiry);
    this.router.post(`${this.path}/feedback`, authMiddleware, validationMiddleware(FeedbackDto), this.supportController.feedback);
    this.router.post(`${this.path}/help`, authMiddleware, validationMiddleware(HelpSupportDto), this.supportController.helpSupport);
  }
}
