import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { ADMIN_PASSWORD, ADMIN_USERNAME, SECRET_KEY } from '@config';
import { HttpException } from '@/exceptions/HttpException';
import { LoginDto, LogoutDto } from '@/dtos/adminDtos/auth.dto';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { DataStoredInToken, IAdminUser } from '@/interfaces/adminInterfaces/auth.interface';
import { AdminSettingsModel } from '@/models/adminSettings.model';

const createToken = (user: IAdminUser): string => {
  const dataStoredInToken: DataStoredInToken = { username: user.username };

  return sign(dataStoredInToken, SECRET_KEY, { expiresIn: '1d' });
};

@Service()
export class AuthService {
  public async login(getData: LoginDto) {
    if (getData.username !== ADMIN_USERNAME || getData.password !== ADMIN_PASSWORD) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.INVALID_CREDENTIALS);
    }

    const token = createToken(getData);
    if (getData.fcmToken) {
      await AdminSettingsModel.findOneAndUpdate({}, { $addToSet: { fcmTokens: getData.fcmToken } }, { upsert: true });
    }

    return token;
  }

  public async logout(data: LogoutDto) {
    if (data.fcmToken) {
      await AdminSettingsModel.findOneAndUpdate({}, { $pull: { fcmTokens: data.fcmToken } });
    }
  }
}
