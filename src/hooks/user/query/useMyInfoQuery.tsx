import { useQuery } from '@tanstack/react-query';
import UserApi from '@/api-url/user/user.api';

interface IProps {
  enabled?: boolean;
}

export const useMyInfoQuery = (props: IProps) => {
  const { enabled } = props;

  return useQuery({
    queryKey: ['user-my-info'],
    queryFn: () => UserApi.getMyInfo(),
    select: (res) => {
      const { email, user } = res.data.data;
      const { name, nickname, birthdate, thumbnail } = user;

      return { email, name, nickname, birthdate, thumbnail };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
    enabled,
  });
};
