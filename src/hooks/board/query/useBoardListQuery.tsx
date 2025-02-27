import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';

export const useBoardListQuery = () => {
  return useInfiniteQuery({
    queryKey: ['board-list'],
    queryFn: ({ pageParam = 1 }) => BoardApi.getBoardList(pageParam),
    getNextPageParam: (lastPage: any) => {
      return lastPage.data.data.nextPage;
    },
    initialPageParam: 1,
  });
};
