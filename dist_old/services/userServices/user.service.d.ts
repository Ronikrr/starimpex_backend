import { UpdateUserDto } from '../../dtos/userDtos/user.dto';
import { User } from '../../models/users.model';
export declare class UserService {
    editUser(updateUser: UpdateUserDto, user: User): Promise<User>;
    changePassword(user: User): Promise<void>;
}
