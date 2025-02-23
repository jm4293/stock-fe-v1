export interface ILoginRes {
  email: string;
  accessToken: string;
}

export interface ISignUpRes {
  email: string;
}

export interface ICheckDuplicateEmailRes {
  isExist: boolean;
  email: string;
}
