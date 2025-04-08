import { Schema } from 'mongoose';
export declare class Contact {
    _id: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    email: string;
    message: string;
    status: string;
}
export declare const ContactModel: import("@typegoose/typegoose").ReturnModelType<typeof Contact, import("@typegoose/typegoose/lib/types").BeAnObject>;
