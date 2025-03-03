import { useInfiniteQuery } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';

export const useBoardListMineQuery = () => {
  return useInfiniteQuery({
    queryKey: ['board-list-mine'],
    queryFn: ({ pageParam }) => BoardApi.getBoardListMine(pageParam),
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
