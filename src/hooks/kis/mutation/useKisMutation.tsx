import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import KisApi from '@/api-url/kis/kis.api';

export const useKisMutation = () => {
  const navigate = useNavigate();

  const deleteOauthRevoke = useMutation({
    mutationFn: () => KisApi.deleteOauthRevoke(),
    onSuccess: () => {
      navigate('/auth/login');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    deleteOauthRevoke,
  };
};
