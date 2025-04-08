import { Schema } from 'mongoose';
export declare class Inquiry {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    companyName: string;
    diamondType: string;
    country: string;
    message: string;
    status: string;
}
export declare const InquiryModel: import("@typegoose/typegoose").ReturnModelType<typeof Inquiry, import("@typegoose/typegoose/lib/types").BeAnObject>;
