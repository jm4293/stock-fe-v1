import {
  UserAccountStatusEnum,
  UserAccountTypeEnum,
  UserNotificationTypeEnum,
  UserStatusEnum,
  UserTypeEnum,
} from '@/constant/enum';

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

export interface INotification {
  userNotificationSeq: number;
  userNotificationType: UserNotificationTypeEnum;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
