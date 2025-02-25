import { useEffect, useState } from 'react';
import logo from '../../../asset/images/sign-in-logo.png';
import kakao from '../../../asset/images/sign-in-kakao.png';
import naver from '../../../asset/images/sign-in-naver.png';
import google from '../../../asset/images/sign-in-google.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Image } from 'components/image';
import { Text } from '@/components/text';
import { AuthLayout } from '@/pages/auth';
import { Margin } from '@/components/margin';
import { useAuthMutation } from '@/hooks/auth';
import { ImageTypeEnum } from '@/types/enum';

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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

  useEffect(() => {
    if (state) {
      const { email } = state;
      setEmail(email);
    }
  }, []);

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

      <div className="w-full flex justify-center">
        <Image src={kakao} type={ImageTypeEnum.SMALL} alt="kakao" />
        <Image src={naver} type={ImageTypeEnum.SMALL} alt="naver" />
        <Image src={google} type={ImageTypeEnum.SMALL} alt="google" />
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
