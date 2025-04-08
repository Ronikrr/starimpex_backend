export declare class CreateUserDto {
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
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    password: string;
    hash: string;
}
