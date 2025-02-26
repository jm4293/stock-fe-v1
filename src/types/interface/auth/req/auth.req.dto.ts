import { UserAccountTypeEnum } from '@/types/enum';

export interface ILoginEmailReq {
  email: string;
  password: string;
}

export interface ILoginOauthReq {
  userAccountType: UserAccountTypeEnum;
  access_token: string;
}

export interface ISignUpReq {
  nickname: string;
  name: string;
  policy: boolean;
  birthdate: string;
  email: string;
  password: string;
}

export interface ICheckEmailReq {
  email: string;
}
