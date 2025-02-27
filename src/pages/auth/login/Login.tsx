import { useEffect, useState } from 'react';
import logo from '../../../asset/images/sign-in-logo.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Image } from 'components/image';
import { Text } from '@/components/text';
import { AuthLayout } from '@/pages/auth';
import { Margin } from '@/components/margin';
import { useAuthMutation } from '@/hooks/auth';
import { ImageTypeEnum, UserAccountTypeEnum } from 'constant/enum';
import { OAuthGoogleButton } from '@/asset/svg/button';

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = useLocation();
  const { provider } = useParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onLoginEmailMutation, onLoginOauthMutation } = useAuthMutation();

  const onLoginHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    onLoginEmailMutation.mutate({ email, password });
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

  const oauthSignIn = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const { id } = event.currentTarget;

    switch (id) {
      case 'kakao':
        break;
      case 'naver':
        break;
      case 'google':
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_OAUTH_CLIEND_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile&include_granted_scopes=true`;
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

          const params = new URLSearchParams(hash.replace('#', ''));
          const accessToken = params.get('access_token') || '';
          const ret = { access_token: accessToken };

          onLoginOauthMutation.mutate({ ...ret, userAccountType: UserAccountTypeEnum.GOOGLE });

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
        {/*<Image src={kakao} type={ImageTypeEnum.SMALL} alt="kakao" onClick={(event) => oauthSignIn(event)} />*/}
        {/*<Image src={naver} type={ImageTypeEnum.SMALL} alt="naver" onClick={(event) => oauthSignIn(event)} />*/}
        <OAuthGoogleButton onClick={oauthSignIn} id="google" />
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
