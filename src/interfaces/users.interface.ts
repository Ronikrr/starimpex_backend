export interface User {
  _id?: string;
  email: string;
  password: string;
}

export enum EUserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DISAPPROVED = 'disapproved',
}

export enum EMessengerType {
  WHATSAPP = 'whatsapp',
  SKYPE = 'skype',
}
