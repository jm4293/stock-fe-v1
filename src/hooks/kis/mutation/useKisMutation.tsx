import { useMutation } from '@tanstack/react-query';
import KisApi from '@/api-url/kis/kis.api';
import { useNavigate } from 'react-router-dom';

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
