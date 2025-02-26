import { useEffect, useState } from 'react';
import logo from '../../../asset/images/sign-in-logo.png';
import kakao from '../../../asset/images/sign-in-kakao.png';
import naver from '../../../asset/images/sign-in-naver.png';
import google from '../../../asset/images/sign-in-google.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Image } from 'components/image';
import { Text } from '@/components/text';
import { AuthLayout } from '@/pages/auth';
import { Margin } from '@/components/margin';
import { useAuthMutation } from '@/hooks/auth';
import { ImageTypeEnum, UserAccountTypeEnum } from '@/types/enum';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = useLocation();
  const { provider } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onLoginInMutation } = useAuthMutation();

  const onLoginHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    onLoginInMutation.mutate({ email, password });
  };

  const onClickHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.stopPropagation();

    const id = event.currentTarget.id;

    switch (id) {
      case 'find-id':
        navigate('/auth/find-id');
        break;
      case 'find-password':
        navigate('/auth/find-password');
        break;
      case 'sign-up':
        navigate('/auth/sign-up');
        break;
      default:
        break;
    }
  };

  const oauthSignIn = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const { alt } = event.currentTarget;

    switch (alt) {
      case 'kakao':
        break;
      case 'naver':
        break;
      case 'google':
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_OAUTH_CLIEND_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile`;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (provider) {
      switch (provider) {
        case 'google':
          const { hash } = location;
          const access_token = hash.split('=')[1].split('&')[0];

          axios
            .post('http://localhost:42973/api/auth/login-oauth', { access_token, type: UserAccountTypeEnum.GOOGLE })
            .then((res) => {
              console.log(res);
            });

          break;
        case 'naver':
          console.log('naver');
          break;
        case 'kakao':
          console.log('kakao');
          break;
        default:
          break;
      }
    }
  }, [provider]);

  useEffect(() => {
    if (state) {
      const { email } = state;
      setEmail(email);
    }
  }, [state]);

  return (
    <AuthLayout>
      <Image src={logo} type={ImageTypeEnum.LARGE_LOGO} alt="sign-in-logo" />

      <Margin direction="bottom" size={14} />

      <div className="w-full flex flex-col gap-4">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 주소" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      </div>

      <Margin direction="bottom" size={14} />

      <div className="w-full">
        <Button text="입장하기" onClick={(event) => onLoginHandler(event)} color="green" />
      </div>

      <Margin direction="bottom" size={14} />

      <div className="w-full flex justify-center gap-10">
        <Image src={kakao} type={ImageTypeEnum.SMALL} alt="kakao" onClick={(event) => oauthSignIn(event)} />
        <Image src={naver} type={ImageTypeEnum.SMALL} alt="naver" onClick={(event) => oauthSignIn(event)} />
        <Image src={google} type={ImageTypeEnum.SMALL} alt="google" onClick={(event) => oauthSignIn(event)} />
      </div>

      <Margin direction="bottom" size={14} />

      <div className="w-full flex justify-center gap-10">
        <Text value="아이디 찾기" color="gray" id="find-id" onClick={onClickHandler} />
        <Text value="비밀번호 찾기" color="gray" id="find-password" onClick={onClickHandler} />
        <Text value="회원가입" color="gray" id="sign-up" onClick={onClickHandler} />
      </div>
    </AuthLayout>
  );
};
