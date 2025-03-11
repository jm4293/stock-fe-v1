import { AxiosConfig } from '@/common/axios-config';
import { IHomeRecentBoardListRes } from '@/types/res';

class HomeApi extends AxiosConfig {
  private readonly _baseURL = '/home';

  async getRecentBoardList() {
    return await this.get<IHomeRecentBoardListRes, null>({ url: `${this._baseURL}/recent-boards` });
  }
}

export default new HomeApi();
