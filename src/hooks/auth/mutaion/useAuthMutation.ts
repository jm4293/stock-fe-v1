import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICheckEmailDto, ILoginEmailDto, ILoginOauthDto, ISignUpDto } from 'types/dto';
import { useSetAtom } from 'jotai';
import { jwtStore } from '@/store/jwt';
import CryptoJS from 'crypto-js';
import { deleteToken, getMessaging } from 'firebase/messaging';
import { requestForToken } from '@/common/firebase-config';
import AuthApi from '@/api-url/auth/auth.api';
import UserApi from '@/api-url/user/user.api';

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
    onSuccess: async (res) => {
      const { accessToken, email } = res.data.data;

      _registerLocalStorage(email);
      _registerAccessToken(accessToken);

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
      const { accessToken, email } = res.data.data;

      _registerLocalStorage(email);
      _registerAccessToken(accessToken);

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
      setJwtToken(null);
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
    // onError: (err) => {
    // alert('로그인이 필요합니다.');
    // navigate('/auth/login', { replace: true });
    // },
  });

  const _registerLocalStorage = (email: string) => {
    const encryptedEmail = CryptoJS.AES.encrypt(email, import.meta.env.VITE_LOCAL_STORAGE_SECRET_KEY).toString();
    localStorage.setItem('state', encryptedEmail);
  };

  const _registerAccessToken = (accessToken: string) => {
    setJwtToken(accessToken);
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
