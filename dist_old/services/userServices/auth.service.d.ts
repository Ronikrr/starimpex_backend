import { CreateUserDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto } from '../../dtos/userDtos/auth.dto';
import { User } from '../../models/users.model';
export declare class AuthService {
    signUp(userData: CreateUserDto): Promise<void>;
    signIn(userCredentials: LoginUserDto): Promise<User>;
    logout(userData: User): Promise<void>;
    forgotPassword(data: ForgotPasswordDto): Promise<void>;
    resetPassword(data: ResetPasswordDto): Promise<void>;
}
