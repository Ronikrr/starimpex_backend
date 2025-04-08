import { LoginDto, LogoutDto } from '../../dtos/adminDtos/auth.dto';
export declare class AuthService {
    login(getData: LoginDto): Promise<string>;
    logout(data: LogoutDto): Promise<void>;
}
