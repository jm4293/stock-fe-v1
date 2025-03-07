import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserApi from '@/api-url/user/user.api';
import { IReadNotificationDto } from '@/types/dto';

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const onReadNotificationMutation = useMutation({
    mutationFn: (dto: IReadNotificationDto) => UserApi.postNotificationRead(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const onReadAllNotificationMutation = useMutation({
    mutationFn: () => UserApi.postNotificationReadAll(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  const onDeleteNotificationMutation = useMutation({
    mutationFn: (notificationSeq: number) => UserApi.deleteNotification(notificationSeq),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification-list'] });
    },
  });

  return {
    onReadNotificationMutation,
    onReadAllNotificationMutation,
    onDeleteNotificationMutation,
  };
};
