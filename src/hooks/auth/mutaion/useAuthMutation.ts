import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthApi from '../../../api-url/auth/auth.api';
import { ICheckEmailDto, ILoginEmailDto, ILoginOauthDto, ISignUpDto } from 'types/dto';
import { useSetAtom } from 'jotai';
import { jwtStore } from '@/store/jwt';
import CryptoJS from 'crypto-js';

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setJwtToken = useSetAtom(jwtStore.setJwt);

  const onSignUpMutation = useMutation({
    mutationFn: (dto: ISignUpDto) => AuthApi.postSignUp(dto),
    onSuccess: (res) => {
      const { email } = res.data.data;

      navigate('/auth/login', { state: { email } });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onLoginEmailMutation = useMutation({
    mutationFn: (dto: ILoginEmailDto) => AuthApi.postSignInEmail(dto),
    onSuccess: (res) => {
      const { accessToken, email } = res.data.data;

      const encryptedEmail = CryptoJS.AES.encrypt(email, import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY).toString();
      localStorage.setItem('state', encryptedEmail);
      setJwtToken(accessToken);

      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onLoginOauthMutation = useMutation({
    mutationFn: (dto: ILoginOauthDto) => AuthApi.postSignInOauth(dto),
    onSuccess: (res) => {
      const { accessToken, email } = res.data.data;

      const encryptedEmail = CryptoJS.AES.encrypt(email, import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY).toString();
      localStorage.setItem('state', encryptedEmail);
      setJwtToken(accessToken);

      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onCheckEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => AuthApi.postCheckEmail(dto),
  });

  const onLogoutMutation = useMutation({
    mutationFn: () => AuthApi.postLogout(),
    onSuccess: async () => {
      await queryClient.clear();

      localStorage.removeItem('state');
      setJwtToken('');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onRefreshTokenMutation = useMutation({
    mutationFn: () => AuthApi.postRefreshToken(),
    onSuccess: (res) => {
      const { accessToken } = res.data.data;

      setJwtToken(accessToken);
    },
    onError: (err) => {
      // alert('로그인이 필요합니다.');
      // navigate('/auth/login', { replace: true });
    },
  });

  return {
    onLoginEmailMutation,
    onLoginOauthMutation,
    onSignUpMutation,
    onCheckEmailMutation,
    onLogoutMutation,
    onRefreshTokenMutation,
  };
};
