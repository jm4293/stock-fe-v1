import { useQuery } from '@tanstack/react-query';
import HomeApi from '@/api-url/home/home.api';

export const useHomeRecentBoardListQuery = () => {
  return useQuery({
    queryKey: ['home-recent-board-list'],
    queryFn: () => HomeApi.getRecentBoardList(),
    select: (res) => res.data.data.boards,
  });
};
