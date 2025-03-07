import { UserAccountTypeEnum } from '@/constant/enum';
import { INotification } from '@/types/interface';

export interface IMyInfoRes {
  email: string;
  nickname: string;
  name: string;
  thumbnail: string;
  userAccountType: UserAccountTypeEnum;
}

export interface INotificationListRes {
  notifications: INotification[];
  total: number;
  nextPage: number | null;
}
