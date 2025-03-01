import { UserStatusEnum, UserTypeEnum } from '@/constant/enum';
import { IUserAccount } from '@/types/interface';

export interface IUser {
  userSeq: number;
  status: UserStatusEnum;
  type: UserTypeEnum;
  name: string;
  nickname: string;
  nameEn: string;
  policy: boolean;
  birthdate: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  userAccount: IUserAccount;
}
