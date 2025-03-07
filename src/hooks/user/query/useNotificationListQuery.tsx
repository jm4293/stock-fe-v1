import { useInfiniteQuery } from '@tanstack/react-query';
import UserApi from '@/api-url/user/user.api';

export const useNotificationListQuery = () => {
  return useInfiniteQuery({
    queryKey: ['notification-list'],
    queryFn: ({ pageParam }) => UserApi.getNotificationList(pageParam),
    getNextPageParam: (lastPage: any) => {
      const { nextPage } = lastPage.data.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages;
    },
    initialPageParam: 1,
  });
};
