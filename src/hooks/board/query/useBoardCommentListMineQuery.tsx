import { useInfiniteQuery } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';

export const useBoardCommentListMineQuery = () => {
  return useInfiniteQuery({
    queryKey: ['board-comment-list-mine'],
    queryFn: ({ pageParam }) => BoardApi.getBoardCommentListMine(pageParam),
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
