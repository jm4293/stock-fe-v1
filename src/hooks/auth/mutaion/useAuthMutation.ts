import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICheckEmailDto, ILoginEmailDto, ILoginOauthDto, ISignUpDto } from 'types/dto';
import CryptoJS from 'crypto-js';
import { deleteToken, getMessaging } from 'firebase/messaging';
import { requestForToken } from '@/common/firebase-config';
import AuthApi from '@/api-url/auth/auth.api';
import UserApi from '@/api-url/user/user.api';
import axios from 'axios';

export const useAuthMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    onSuccess: async (res) => {
      const { accessToken } = res.data.data;

      _registerSessionStorage({ accessToken });

      await _registerFirebaseToken();

      navigate('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onLoginOauthMutation = useMutation({
    mutationFn: (dto: ILoginOauthDto) => AuthApi.postSignInOauth(dto),
    onSuccess: async (res) => {
      const { accessToken } = res.data.data;

      _registerSessionStorage({ accessToken });

      await _registerFirebaseToken();

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
      queryClient.clear();

      const firebase_messaging = getMessaging();
      await deleteToken(firebase_messaging);

      localStorage.clear();
      sessionStorage.clear();
      axios.defaults.headers.common = {};
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onRefreshTokenMutation = useMutation({
    mutationFn: () => AuthApi.postRefreshToken(),
    onSuccess: (res) => {
      const { accessToken } = res.data.data;

      _registerSessionStorage({ accessToken });
    },
    // onError: (err) => {
    // alert('로그인이 필요합니다.');
    // navigate('/auth/login', { replace: true });
    // },
  });

  const _registerSessionStorage = (params: { accessToken: string }) => {
    const encryptedState = CryptoJS.AES.encrypt(
      JSON.stringify(params),
      import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY,
    ).toString();

    sessionStorage.setItem('state', encryptedState);
  };

  const _registerFirebaseToken = async () => {
    const token = await requestForToken();

    if (token) {
      await UserApi.postRegisterPushToken({ pushToken: token });

      const encryptedToken = CryptoJS.AES.encrypt(token, import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY).toString();
      localStorage.setItem('FT', encryptedToken);
    }
  };

  return {
    onLoginEmailMutation,
    onLoginOauthMutation,
    onSignUpMutation,
    onCheckEmailMutation,
    onLogoutMutation,
    onRefreshTokenMutation,
  };
};
