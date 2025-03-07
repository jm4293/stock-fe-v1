import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { AuthLayout } from '@/pages/auth';
import { useAuthMutation } from '@/hooks/auth';
import { UserAccountTypeEnum } from 'constant/enum';
import { CheckBoxSvg, OAuthGoogleButtonSvg, OAuthGoogleSvg } from '@/asset/svg';
import { useEffect, useState } from 'react';
import { useDeviceLayout } from '@/hooks/useDeviceLayout';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const { provider } = useParams();

  const { isMobile } = useDeviceLayout();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const { onLoginEmailMutation, onLoginOauthMutation } = useAuthMutation();

  const onLoginHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

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
    event.stopPropagation();

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_OAUTH_CLIEND_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile&include_granted_scopes=true`;
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.key !== 'Enter') {
      return;
    }

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    onLoginEmailMutation.mutate({ email, password });
  };

  useEffect(() => {
    if (provider) {
      const { hash } = location;

      const params = new URLSearchParams(hash.replace('#', ''));
      const accessToken = params.get('access_token') || '';
      const ret = { access_token: accessToken };

      onLoginOauthMutation.mutate({ ...ret, userAccountType: UserAccountTypeEnum.GOOGLE });
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
      <div className="w-full flex flex-col gap-4 mb-16">
        <Input
          type="email"
          title="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
        />
        <Input
          type="password"
          title="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => onKeyDownHandler(event)}
          placeholder="비밀번호"
        />
      </div>

      <div className="mb-7">
        <Button text="로그인" onClick={(event) => onLoginHandler(event)} disabled={onLoginEmailMutation.isPending} />
      </div>

      <div className={`mb-12 flex justify-between flex-wrap ${isMobile ? 'flex-col' : 'flex-row'}`}>
        <div className="flex items-center gap-1.5">
          <CheckBoxSvg isCheck={isAutoLogin} onClick={() => setIsAutoLogin(!isAutoLogin)} />
          <Text value="자동로그인" id="find-id" color="#000000" onClick={() => setIsAutoLogin(!isAutoLogin)} />
        </div>

        <div className={`flex gap-2.5 ${isMobile ? 'justify-center' : ''}`}>
          <Text value="아이디 찾기" id="find-id" color="#000000" onClick={onClickHandler} />
          <div className="w-[1px] h-2/3 bg-[#B5B5B5]" />
          <Text value="비밀번호 찾기" id="find-password" color="#000000" onClick={onClickHandler} />
          <div className="w-[1px] h-2/3 bg-[#B5B5B5]" />
          <Text value="회원가입" id="sign-up" color="#000000" onClick={onClickHandler} />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <OAuthGoogleButtonSvg onClick={(event) => oauthSignIn(event)} />
      </div>
    </AuthLayout>
  );
};
