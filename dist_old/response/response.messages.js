"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessages = void 0;
exports.ResponseMessages = {
    /* Common */
    SOMETHING_WENT_WRONG: 'Something went wrong',
    INVALID_AUTH_TOKEN: 'Wrong authentication token',
    MISSING_AUTH_TOKEN: 'Authentication token missing',
    LOGIN_SUCCESS: 'Logged in successfully',
    INVALID_CREDENTIALS: 'Invalid credentials',
    LOGOUT_SUCCESS: 'User logged out successfully',
    USER_UPDATE_SUCCESS: 'User updated successfully',
    USER_UPDATE_ERROR: 'Error while updating user',
    USER_NOT_FOUND: 'User not found',
    USER_FOUND: 'User found',
    SEND_EMAIL_SUCCESS: 'Email sent successfully',
    DIAMOND_LIST_FOUND: 'Diamond list found',
    DIAMOND_NOT_FOUND: 'Diamond not found',
    DIAMOND_FOUND: 'Diamond found',
    DIAMOND_EYE_CLEAN_FILTER_ERROR: 'Eye clean list each should be valid enum',
    SOLD_OUT_ERROR_REFRESH_PAGE: 'One or more items are sold out! Please refresh to see latest update.',
    DIAMOND_CERTIFICATE_FOUND: 'Diamond certificate found',
    DIAMOND_VIDEO_FOUND: 'Diamond video found',
    ORDER_LIST_FOUND: 'Order list found',
    ORDER_NOT_FOUND: 'Order not found',
    ORDER_FOUND: 'Order found',
    /* Admin */
    USER_LIST_FOUND: 'User list found',
    DIAMOND_SOURCE_LIST_FOUND: 'Diamond source list found',
    DIAMOND_SOURCE_ENABLED_SUCCESS: 'Diamond source enabled successfully',
    DIAMOND_SOURCE_DISABLED_SUCCESS: 'Diamond source disabled successfully',
    DIAMOND_SOURCE_UPDATE_SUCCESS: 'Diamond source updated successfully',
    DIAMOND_SOURCE_UPDATE_ERROR: 'Error while updating diamond source',
    CHANGE_STATUS_FILE_SOURCE_ERROR: 'Cannot change file source type status',
    UPDATE_MARKUP_FILE_SOURCE_ERROR: 'Cannot update markup for file source type',
    CONTACT_LIST_FOUND: 'Contact list found',
    INQUIRY_LIST_FOUND: 'Inquiry list found',
    FEEDBACK_LIST_FOUND: 'Feedback list found',
    CUSTOMER_QUERY_LIST_FOUND: 'Customer query list found',
    CHANGE_SUPPORT_REQUEST_STATUS_SUCCESS: 'Status changed successfully',
    CONTACT_NOT_FOUND: 'Contact not found',
    INQUIRY_NOT_FOUND: 'Inquiry not found',
    CUSTOMER_QUERY_NOT_FOUND: 'Customer query not found',
    ORDER_STATUS_CHANGE_SUCCESS: 'Order status changed successfully',
    ORDER_UPDATE_ADDITIONAL_CHARGES_SUCCESS: 'Additional charges updated successfully',
    PARTIAL_CONFIRMATION_NOT_ALLOWED_ERROR: 'Partial confirmation is not allowed on status type other than partially_confirm',
    ORDER_STATUS_CHANGE_ITEMS_NOT_MATCH_ERROR: 'Order Items does not match with order items',
    ORDER_STATUS_CHANGE_TYPE_PARTIAL_ITEMS_NOT_PARTIALLY_CONFIRMED_ERROR: 'Items should be partially confirmed',
    ORDER_NOT_FOUND_OR_CANNOT_UPDATE: 'Order not found or cannot be updated',
    ORDER_CREATE_SUCCESS: 'Order created successfully',
    ORDER_UPDATE_SUCCESS: 'Order updated successfully',
    DIAMOND_SEARCH_STATS_FOUND: 'Diamond search stats found',
    ADMIN_DASHBOARD_STATS_FOUND: 'Dashboard stats found',
    NOTIFICATION_CREATE_ERROR: 'Error while creating notification',
    NOTIFICATION_UPDATE_ERROR: 'Error while updating notification',
    NOTIFICATION_DELETE_ERROR: 'Error while deleting notification',
    NOTIFICATION_LIST_FOUND: 'Notification list found',
    NOTIFICATION_DELETE_SUCCESS: 'Notification(s) deleted successfully',
    NOTIFICATION_MARK_READ_SUCCESS: 'Notification marked as read successfully',
    FCM_TOKEN_UPDATE_SUCCESS: 'Fcm token updated successfully',
    UPLOAD_VIA_FILE_SUCCESS: 'Diamonds updated successfully',
    UPLOAD_VIA_FILE_UPLOAD_FILE_ERROR: 'Upload file to save data!',
    UPLOAD_VIA_FILE_INVALID_FILE_ERROR: 'Invalid file. Only xlsx,xls or csv file allowed!',
    UPLOAD_VIA_FILE_EMPTY_INVALID_ERROR: 'Cannot upload. File is empty or invalid!',
    UPLOAD_VIA_FILE_STONE_NO_REQUIRED_ERROR: 'Cannot upload. Stone no is required!',
    UPLOAD_VIA_FILE_RAP_INVALID_ERROR: 'Cannot upload. Rap is required and must be number!',
    UPLOAD_VIA_FILE_PRICE_PER_CARAT_INVALID_ERROR: 'Cannot upload. Price per carat is required and must be number!',
    UPLOAD_VIA_FILE_DISCOUNT_INVALID_ERROR: 'Cannot upload. Discount  is required and must be number!',
    UPLOAD_VIA_FILE_PRICE_INVALID_ERROR: 'Cannot upload. Price  is required and must be number!',
    UPLOAD_VIA_FILE_INVALID_DIAMOND_TYPE_ERROR: 'Cannot upload. File contains invalid diamond type or empty!',
    UPLOAD_VIA_FILE_INVALID_LAB_ERROR: 'Cannot upload. File contains invalid lab!',
    UPLOAD_VIA_FILE_INVALID_SHAPE_ERROR: 'Cannot upload. File contains invalid shape!',
    UPLOAD_VIA_FILE_INVALID_COLOR_ERROR: 'Cannot upload. File contains invalid color!',
    UPLOAD_VIA_FILE_INVALID_CLARITY_ERROR: 'Cannot upload. File contains invalid clarity!',
    UPLOAD_VIA_FILE_INVALID_CUT_ERROR: 'Cannot upload. File contains invalid cut!',
    UPLOAD_VIA_FILE_INVALID_POLISH_ERROR: 'Cannot upload. File contains invalid polish!',
    UPLOAD_VIA_FILE_INVALID_SYMMETRY_ERROR: 'Cannot upload. File contains invalid symmetry!',
    UPLOAD_VIA_FILE_INVALID_SUB_TYPE_ERROR: 'Cannot upload. File contains invalid sub type!',
    UPLOAD_VIA_FILE_INVALID_INSCRIPTION_ERROR: 'Cannot upload. File contains invalid inscription!',
    UPLOAD_VIA_FILE_INVALID_NO_BGM_ERROR: 'Cannot upload. File contains invalid no bgm!',
    UPLOAD_VIA_FILE_INVALID_LUSTER_ERROR: 'Cannot upload. File contains invalid luster!',
    UPLOAD_VIA_FILE_INVALID_EYE_CLEAN_ERROR: 'Cannot upload. File contains invalid eye clean!',
    UPLOAD_VIA_FILE_INVALID_HEARTS_ARROWS_ERROR: 'Cannot upload. File contains invalid hearts and arrows!',
    UPLOAD_VIA_FILE_INVALID_CULET_SIZE_ERROR: 'Cannot upload. File contains invalid culet size!',
    UPLOAD_VIA_FILE_INVALID_FANCY_COLOR_ERROR: 'Cannot upload. File contains invalid fancy color!',
    UPLOAD_VIA_FILE_INVALID_FANCY_INTENSITY_ERROR: 'Cannot upload. File contains invalid fancy intensity!',
    UPLOAD_VIA_FILE_INVALID_FANCY_OVERTONE_ERROR: 'Cannot upload. File contains invalid fancy overtone!',
    UPLOAD_VIA_FILE_INVALID_KEY_TO_SYMBOL_ERROR: 'Cannot upload. File contains invalid key to symbol or assigned in lag grown type!',
    UPLOAD_VIA_FILE_INVALID_STATUS_ERROR: 'Cannot upload. File contains invalid status or empty!',
    PURCHASE_ALREADY_EXISTS: 'Purchase with provided one or more items already exists',
    PURCHASE_NOT_FOUND: 'Purchase not found',
    PURCHASE_FOUND: 'Purchase found',
    PURCHASE_CREATE_SUCCESS: 'Purchase created successfully',
    PURCHASE_UPDATE_SUCCESS: 'Purchase updated successfully',
    PURCHASE_LIST_FOUND: 'Purchase list found',
    PURCHASE_DELETE_SUCCESS: 'Purchase deleted successfully',
    PURCHASE_CREATE_FAILED_FOUND_DUPLICATE_ITEMS: 'Cannot create purchase, duplicate items found.',
    PURCHASE_UPDATE_FAILED_FOUND_DUPLICATE_ITEMS: 'Cannot update purchase, duplicate items found.',
    /* User */
    SIGNUP_SUCCESS: 'You have successfully registered. Will contact you soon.',
    USER_ALREADY_EXISTS: 'You have already registered',
    INVALID_REQUEST: 'Invalid Request',
    CHANGE_PASSWORD_SUCCESS: 'Password changed successfully',
    USER_NOT_APPROVED: 'Your account is not approved. Please contact support.',
    SUPPORT_REQUEST_SUCCESS: 'We have received your request and will contact you ASAP. Thank you for your patience.',
    FEEDBACK_SUCCESS: 'Thanks for helping us out! We appreciate your feedback.',
    ADD_TO_CART_SUCCESS: 'Added to cart successfully',
    CART_ITEM_DELETE_SUCCESS: 'Removed from cart successfully',
    CART_ITEM_LIST_FOUND: 'Cart item list found',
    ITEMS_SOLD_OUT: 'Cannot add to cart! One or more items are sold out',
    ORDER_CREATED_SUCCESSFULLY: 'Order placed successfully',
    ORDER_FAILED_SOLD_OUT_ERROR: 'Cannot place order! One or more items are sold out',
    ORDER_FAILED_ACCEPT_TERMS_ERROR: 'Please read and accept our terms before placing order',
    DIAMOND_NOTES_UPDATE_SUCCESS: 'Diamond notes updated successfully',
    USER_DASHBOARD_STATS_FOUND: 'User dashboard stats found',
    USER_DIAMOND_SEARCH_SAVE_SUCCESS: 'User diamond search saved successfully',
    PRICE_TRACKER_ADD_SUCCESS: 'Added to price tracker successfully',
    PRICE_TRACKER_ITEMS_SOLD_OUT_ERROR: 'Cannot add to price tracker! One or more items are sold out',
    PRICE_TRACK_LIST_FOUND: 'Price track list found',
    PRICE_TRACK_REMOVE_SUCCESS: 'Removed from price tracker successfully',
    USER_PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
};
//# sourceMappingURL=response.messages.js.map