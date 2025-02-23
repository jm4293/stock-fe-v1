import { AxiosConfig } from '@/common/axios-config';
import { ICheckDuplicateEmailReq, ILoginReq, ISignUpReq } from '@/types/interface/auth/req';
import { ICheckDuplicateEmailRes, ILoginRes, ISignUpRes } from '@/types/interface/auth/res';

class AuthApi extends AxiosConfig {
  private readonly _baseURL = '/auth';

  async postSignUp(dto: ISignUpReq) {
    return await this.post<ISignUpRes, ISignUpReq>({
      url: `${this._baseURL}/register-email`,
      data: dto,
    });
  }

  async postSignIn(dto: ILoginReq) {
    return await this.post<ILoginRes, ILoginReq>({
      url: `${this._baseURL}/login-email`,
      data: dto,
    });
  }

  async postCheckEmail(dto: ICheckDuplicateEmailReq) {
    return await this.post<ICheckDuplicateEmailRes, ICheckDuplicateEmailReq>({
      url: `${this._baseURL}/check-email`,
      data: dto,
    });
  }
}

export default new AuthApi();
