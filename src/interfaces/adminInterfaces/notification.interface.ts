export enum ENotificationType {
  NEW_ORDER = 'new_order',
  NEW_REGISTRATION = 'new_registration',
  USER_ADD_TO_CART_ACTION = 'user_add_to_cart_action',
  USER_ADD_TO_PRICE_TRACK_ACTION = 'user_add_to_price_track_action',
}

export interface INotification {
  type: ENotificationType;
  title: string;
  body: string;
  url: string;
}
