import { AxiosConfig } from '@/common/axios-config';
import { IMyInfoRes } from '@/types/res/user/user.res';

class UserApi extends AxiosConfig {
  private readonly _baseURL = '/user';

  async getMyInfo() {
    return await this.get<IMyInfoRes, null>({ url: `${this._baseURL}` });
  }
}

export default new UserApi();
