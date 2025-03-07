import { UserAccountTypeEnum } from '@/constant/enum';

export interface ILoginEmailDto {
  email: string;
  password: string;
}

export interface ILoginOauthDto {
  userAccountType: UserAccountTypeEnum;
  access_token: string;
}

export interface ISignUpDto {
  nickname: string;
  name: string;
  policy: boolean;
  birthdate: string;
  email: string;
  password: string;
}

export interface ICheckEmailDto {
  email: string;
}
