export interface ILoginReq {
  email: string;
  password: string;
}

export interface ISignUpReq {
  nickname: string;
  name: string;
  policy: boolean;
  birthdate: string;
  email: string;
  password: string;
}

export interface ICheckDuplicateEmailReq {
  email: string;
}
