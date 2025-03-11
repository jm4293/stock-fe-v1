import { useQuery } from '@tanstack/react-query';
import KisApi from '@/api-url/kis/kis.api';

export const useKisOauthTokenQuery = () => {
  // const state = sessionStorage.getItem('state');

  return useQuery({
    queryKey: ['kis-oauth-token'],
    queryFn: () => KisApi.getOauthToken(),
    select: (res) => res.data.data.kisToken,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
    // enabled: !!state,
  });
};
