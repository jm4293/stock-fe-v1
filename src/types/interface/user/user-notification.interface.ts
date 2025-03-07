import { UserNotificationTypeEnum } from '@/constant/enum';

export interface INotification {
  userNotificationSeq: number;
  userNotificationType: UserNotificationTypeEnum;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
