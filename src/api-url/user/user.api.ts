import { AxiosConfig } from '@/common/axios-config';
import { IMyInfoRes } from '@/types/res/user/user.res';
import { IRegisterPushTokenDto } from '@/types/dto';

class UserApi extends AxiosConfig {
  private readonly _baseURL = '/user';

  async getMyInfo() {
    return await this.get<IMyInfoRes, null>({ url: `${this._baseURL}` });
  }

  async postRegisterPushToken(dto: IRegisterPushTokenDto) {
    return await this.post<null, IRegisterPushTokenDto>({ url: `${this._baseURL}/push-token`, data: dto });
  }
}

export default new UserApi();
