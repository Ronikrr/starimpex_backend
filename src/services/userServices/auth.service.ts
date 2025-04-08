import { CreateUserDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto } from '@/dtos/userDtos/auth.dto';
import { HttpException } from '@/exceptions/HttpException';
import { EUserStatus } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { DataStoredInToken } from '@/interfaces/userInterfaces/auth.interface';
import { User } from '@models/users.model';
import { createHmac } from 'crypto';
import { sendForgotPasswordMail, sendSignUpMail } from '@/utils/mailer';
import NotificationService from '../adminServices/notification.service';
import { AdminSettingsModel } from '@/models/adminSettings.model';
import { ENotificationType, INotification } from '@/interfaces/adminInterfaces/notification.interface';

const createToken = (user: User): string => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };

  return sign(dataStoredInToken, SECRET_KEY, { expiresIn: '1d' });
};

async function newRegistrationNotification(createdUser: User) {
  const notificationService = new NotificationService();

  const fcmToken = (await AdminSettingsModel.findOne())?.fcmTokens || [];

  const notification: INotification = {
    title: 'New Registration',
    body: `${createdUser.fullName} [${createdUser.email}] has registered.`,
    type: ENotificationType.NEW_REGISTRATION,
    url: '/admin/user-list',
  };
  await notificationService.createNotification(notification, fcmToken);
}

@Service()
export class AuthService {
  public async signUp(userData: CreateUserDto) {
    const { password, ...otherDetails } = userData;

    const findUser = await UserModel.findOne({ email: otherDetails.email.toLowerCase() });
    if (findUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_ALREADY_EXISTS);
    }

    const newHashPassword = await hash(password, 10);

    const createdUser = await UserModel.create({
      ...otherDetails,
      fullName: `${otherDetails.firstName} ${otherDetails.lastName}`,
      email: otherDetails.email.toLowerCase(),
      password: newHashPassword,
    });
    sendSignUpMail(createdUser);
    newRegistrationNotification(createdUser);
  }

  public async signIn(userCredentials: LoginUserDto): Promise<User> {
    const findUser = await UserModel.findOne({ email: userCredentials.email.toString() });

    if (findUser && findUser.status !== EUserStatus.APPROVED) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_NOT_APPROVED);
    }

    if (!findUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.INVALID_CREDENTIALS);
    }

    const passwordMatched: boolean = await compare(userCredentials.password, findUser.password);
    if (!passwordMatched) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.INVALID_CREDENTIALS);
    }

    const token = createToken(findUser);

    const updatedUser = await UserModel.findOneAndUpdate({ email: userCredentials.email.toLowerCase() }, { $set: { token } }, { new: true });
    if (!updatedUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_UPDATE_ERROR);
    }

    return updatedUser;
  }

  public async logout(userData: User) {
    const findUser: User = await UserModel.findOneAndUpdate({ _id: userData._id }, { token: null }, { new: true });
    if (!findUser) throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_UPDATE_ERROR);
  }

  public async forgotPassword(data: ForgotPasswordDto) {
    const findUser = await UserModel.findOne({ email: data.email.toString(), status: EUserStatus.APPROVED });

    if (!findUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_NOT_FOUND);
    }

    const hash = createHmac('sha256', SECRET_KEY).update(data.email).digest('hex');

    sendForgotPasswordMail(data.email, hash);
  }

  public async resetPassword(data: ResetPasswordDto) {
    const newHash = createHmac('sha256', SECRET_KEY).update(data.email).digest('hex');
    if (newHash !== data.hash) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.INVALID_REQUEST);
    }

    const findUser = await UserModel.findOne({ email: data.email.toString(), status: EUserStatus.APPROVED });
    if (!findUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_NOT_FOUND);
    }

    const newHashPassword = await hash(data.password, 10);
    const updatedUser = await UserModel.findOneAndUpdate({ email: data.email }, { $set: { password: newHashPassword } }, { new: true });
    if (!updatedUser) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.USER_UPDATE_ERROR);
    }
  }
}
