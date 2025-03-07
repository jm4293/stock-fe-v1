import { AxiosConfig } from '@/common/axios-config';
import { IReadNotificationDto, IRegisterPushTokenDto } from '@/types/dto';
import { IMyInfoRes, INotificationListRes } from '@/types/res';

class UserApi extends AxiosConfig {
  private readonly _baseURL = '/user';

  async getMyInfo() {
    return await this.get<IMyInfoRes, null>({ url: `${this._baseURL}` });
  }

  async postRegisterPushToken(dto: IRegisterPushTokenDto) {
    return await this.post<null, IRegisterPushTokenDto>({ url: `${this._baseURL}/push-token`, data: dto });
  }

  async getNotificationList(pageParam: number) {
    return await this.get<INotificationListRes, { pageParam: number }>({
      url: `${this._baseURL}/notifications`,
      params: { pageParam },
    });
  }

  async postNotificationRead(dto: IReadNotificationDto) {
    return await this.post<null, IReadNotificationDto>({ url: `${this._baseURL}/notification/read`, data: dto });
  }

  async postNotificationReadAll() {
    return await this.post<null, {}>({ url: `${this._baseURL}/notification/read-all`, data: {} });
  }

  async deleteNotification(notificationSeq: number) {
    return await this.delete<null, null>({ url: `${this._baseURL}/notification/${notificationSeq}` });
  }
}

export default new UserApi();
