export interface User {
    _id?: string;
    email: string;
    password: string;
}
export declare enum EUserStatus {
    PENDING = "pending",
    APPROVED = "approved",
    DISAPPROVED = "disapproved"
}
export declare enum EMessengerType {
    WHATSAPP = "whatsapp",
    SKYPE = "skype"
}
