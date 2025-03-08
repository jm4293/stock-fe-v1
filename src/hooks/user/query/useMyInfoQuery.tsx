import { useQuery } from '@tanstack/react-query';
import UserApi from '@/api-url/user/user.api';

interface IProps {
  enabled?: boolean;
}

export const useMyInfoQuery = () => {
  const state = localStorage.getItem('state');

  return useQuery({
    queryKey: ['user-my-info'],
    queryFn: () => UserApi.getMyInfo(),
    select: (res) => {
      const { email, nickname, name, thumbnail, userAccountType } = res.data.data;

      return { email, name, nickname, thumbnail, userAccountType };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
    enabled: !!state,
  });
};
