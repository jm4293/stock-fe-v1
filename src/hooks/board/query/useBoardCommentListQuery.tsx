import { useInfiniteQuery } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';

interface IProps {
  boardSeq: number | undefined;
}

export const useBoardCommentListQuery = (props: IProps) => {
  const { boardSeq } = props;

  return useInfiniteQuery({
    queryKey: ['board-comment-list'],
    queryFn: ({ pageParam = 1 }) => BoardApi.getBoardCommentList({ boardSeq: Number(boardSeq), pageParam }),
    getNextPageParam: (lastPage: any) => {
      return lastPage.data.data.nextPage;
    },
    select: (data) => {
      return data.pages;
    },
    initialPageParam: 1,
    enabled: !!boardSeq,
  });
};
