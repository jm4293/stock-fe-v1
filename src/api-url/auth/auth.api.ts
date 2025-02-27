import { AxiosConfig } from '@/common/axios-config';
import { ICheckEmailReq, ILoginEmailReq, ILoginOauthReq, ISignUpReq } from '@/types/req';
import { ICheckEmailRes, ILoginRes, ISignUpRes } from '@/types/res';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async postSignUp(dto: ISignUpReq) {
    return await this.post<ISignUpRes, ISignUpReq>({
      url: `${this._baseURL}/register-email`,
      data: dto,
    });
  }

  async postSignInEmail(dto: ILoginEmailReq) {
    return await this.post<ILoginRes, ILoginEmailReq>({
      url: `${this._baseURL}/login-email`,
      data: dto,
    });
  }

  async postSignInOauth(dto: ILoginOauthReq) {
    return await this.post<ILoginRes, ILoginOauthReq>({
      url: `${this._baseURL}/login-oauth`,
      data: dto,
    });
  }

  async postCheckEmail(dto: ICheckEmailReq) {
    return await this.post<ICheckEmailRes, ICheckEmailReq>({
      url: `${this._baseURL}/check-email`,
      data: dto,
    });
  }
}

export default new AuthApi();
