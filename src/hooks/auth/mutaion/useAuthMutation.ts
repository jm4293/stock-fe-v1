import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import { ICheckDuplicateEmailReq, ILoginReq, ISignUpReq } from '@/types/interface/auth/req';

export default function useAuthMutation() {
  const navigate = useNavigate();

  const onSignUpMutation = useMutation({
    mutationFn: (dto: ISignUpReq) => AuthApi.postSignUp(dto),
    onSuccess: (res) => {
      const { email } = res.data.data;

      navigate('/auth/login', { state: { email } });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onLoginInMutation = useMutation({
    mutationFn: (dto: ILoginReq) => AuthApi.postSignIn(dto),
    onSuccess: (res) => {
      // navigate('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onCheckEmailMutation = useMutation({
    mutationFn: (dto: ICheckDuplicateEmailReq) => AuthApi.postCheckEmail(dto),
  });

  return {
    onLoginInMutation,
    onSignUpMutation,
    onCheckEmailMutation,
  };
}
