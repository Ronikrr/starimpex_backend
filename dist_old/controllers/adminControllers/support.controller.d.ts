import { NextFunction, Request, Response } from 'express';
export declare class SupportController {
    private supportService;
    getContactList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getInquiryList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getFeedbackList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getHelpSupportList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changeContactStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changeInquiryStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changeHelpSupportStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
