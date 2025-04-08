import { Order } from '../models/order.model';
import { User } from '../models/users.model';
export declare const sendForgotPasswordMail: (email: string, hash: string) => void;
export declare const sendContactUsMail: ({ firstName, lastName, email, phone, country, message, }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    message: string;
}) => Promise<void>;
export declare const sendInquiryMail: ({ firstName, lastName, email, phone, country, message, companyName, diamondType, }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    companyName: string;
    diamondType: string;
}) => Promise<void>;
export declare const sendPlacedOrderMail: ({ user, order, excelBuffer }: {
    user: User;
    order: Order;
    excelBuffer: any;
}) => Promise<void>;
export declare const sendChangePasswordMail: (email: string, hash: string) => void;
export declare const sendDiamondDataExcelMail: ({ email, excelBuffer }: {
    email: string;
    excelBuffer: any;
}) => Promise<void>;
export declare const sendSignUpMail: (user: User) => Promise<void>;
