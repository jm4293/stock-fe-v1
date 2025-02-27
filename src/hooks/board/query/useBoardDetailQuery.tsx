import { useQuery } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';

interface IProps {
  boardSeq: number;
}

export const useBoardDetailQuery = (props: IProps) => {
  const { boardSeq } = props;

  return useQuery({
    queryKey: ['board-detail', boardSeq],
    queryFn: () => BoardApi.getBoardDetail(boardSeq),
    select: (res) => {
      const { boardSeq, title, content, createdAt, updatedAt, user } = res.data.data.board;
      const { name, nickname, birthdate, thumbnail } = user;

      return { title, content };
    },
    enabled: !!boardSeq,
    staleTime: 1000 * 60 * 60, // 1시간
  });
};
