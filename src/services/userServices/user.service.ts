import { SECRET_KEY } from '@/config';
import { UpdateUserDto } from '@/dtos/userDtos/user.dto';
import { HttpException } from '@/exceptions/HttpException';
import { User, UserModel } from '@/models/users.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { sendChangePasswordMail } from '@/utils/mailer';
import { createHmac } from 'crypto';
import { Service } from 'typedi';

@Service()
export class UserService {
  public async editUser(updateUser: UpdateUserDto, user: User): Promise<User> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          firstName: updateUser.firstName,
          lastName: updateUser.lastName,
          fullName: `${updateUser.firstName} ${updateUser.lastName}`,
          companyName: updateUser.companyName,
          address: updateUser.address,
          state: updateUser.state,
          city: updateUser.city,
          country: updateUser.country,
          mobileNumber: updateUser.mobileNumber || null,
          telephoneNumber: updateUser.telephoneNumber || null,
          messengerType: updateUser.messengerType || null,
          messengerIdNumber: updateUser.messengerIdNumber || null,
          website: updateUser.website || null,
          notes: updateUser.notes || null,
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.SOMETHING_WENT_WRONG);
    }

    return updatedUser;
  }

  public async changePassword(user: User) {
    const hash = createHmac('sha256', SECRET_KEY).update(user.email).digest('hex');

    sendChangePasswordMail(user.email, hash);
  }
}
