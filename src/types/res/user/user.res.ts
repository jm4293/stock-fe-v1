import { UserAccountTypeEnum } from '@/constant/enum';

export interface IMyInfoRes {
  email: string;
  nickname: string;
  name: string;
  thumbnail: string;
  userAccountType: UserAccountTypeEnum;
}
