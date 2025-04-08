import { Schema } from 'mongoose';
export declare class User {
    _id: Schema.Types.ObjectId;
    fullName: string;
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    state: string;
    city: string;
    country: string;
    mobileNumber: string;
    telephoneNumber: string;
    email: string;
    messengerType: string;
    messengerIdNumber: string;
    website: string;
    password: string;
    notes: string;
    status: string;
    token: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, import("@typegoose/typegoose/lib/types").BeAnObject>;
