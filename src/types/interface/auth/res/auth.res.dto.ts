export interface ILoginRes {
  access_token: string;
  refresh_token: string;
}

export interface ISignUpRes {
  email: string;
}

export interface ICheckDuplicateEmailRes {
  isExist: boolean;
  email: string;
}
