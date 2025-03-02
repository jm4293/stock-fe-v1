import { UserAccountStatusEnum, UserAccountTypeEnum } from '@/constant/enum';
import { IUser } from '@/types/interface';

export interface IUserAccount {
  userAccountSeq: number;
  status: UserAccountStatusEnum;
  userAccountType: UserAccountTypeEnum;
  email: string;
  password: string | null;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
