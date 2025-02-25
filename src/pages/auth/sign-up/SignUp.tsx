import { AuthLayout } from '@/pages/auth';
import { Image } from '@/components/image';
import logo from '@/asset/images/sign-in-logo.png';
import { Margin } from '@/components/margin';
import { Input } from '@/components/input';
import { useState } from 'react';
import { ISignUpReq } from '@/types/interface/auth/req';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { useAuthMutation } from '@/hooks/auth';
import { ImageTypeEnum } from '@/types/enum';

export const SignUp = () => {
  const [formData, setFormData] = useState<ISignUpReq>({
    nickname: '',
    name: '',
    policy: true,
    birthdate: '',
    email: '',
    password: '',
  });
  const [confirmDuplicateEmail, setConfirmDuplicateEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const { onSignUpMutation, onCheckEmailMutation } = useAuthMutation();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDuplicateCheckHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (confirmDuplicateEmail) {
      return;
    }

    if (!formData.email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const ret = await onCheckEmailMutation.mutateAsync({ email: formData.email });
    const { isExist } = ret.data.data;

    if (isExist) {
      alert('이미 사용중인 이메일입니다.');
      return;
    } else {
      setConfirmDuplicateEmail(true);
    }
  };

  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (!confirmDuplicateEmail) {
      alert('이메일 중복확인을 해주세요.');
      return;
    }

    if (formData.password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.policy) {
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }

    if (formData.birthdate && formData.birthdate.length !== 8) {
      alert('생년월일은 8자리로 입력해주세요.');
      return;
    }

    if (formData.email === '' || formData.password === '' || formData.nickname === '' || formData.name === '') {
      alert('빈칸을 채워주세요.');
      return;
    }

    onSignUpMutation.mutate(formData);
  };

  return (
    <AuthLayout>
      <Image src={logo} alt="sign-in-logo" type={ImageTypeEnum.LARGE_LOGO} />

      <Margin direction="bottom" size={14} />

      <Text value="회원가입" color="black" size="large" />

      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Text value="인증정보" color="gray" />
          <div className="grid grid-cols-6 gap-2">
            <Input
              type="email"
              name="email"
              className="col-span-5"
              value={formData.email}
              onChange={(event) => onChangeHandler(event)}
              placeholder="이메일 주소"
              disabled={confirmDuplicateEmail}
            />
            <Button
              text={`${confirmDuplicateEmail ? '완료' : '중복 확인'}`}
              onClick={(event) => onDuplicateCheckHandler(event)}
              disabled={onCheckEmailMutation.isPending}
            />
          </div>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) => onChangeHandler(event)}
            placeholder="비밀번호"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="비밀번호 확인"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Text value="개인정보" color="gray" />
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={(event) => onChangeHandler(event)}
            placeholder="닉네임"
          />
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={(event) => onChangeHandler(event)}
            placeholder="이름"
          />
          <Input
            type="text"
            name="birthdate"
            value={formData.birthdate}
            onChange={(event) => onChangeHandler(event)}
            placeholder="생년월일 8자리"
            optional
          />
        </div>

        <Button
          text="회원가입"
          color="green"
          onClick={(event) => onSubmitHandler(event)}
          disabled={onSignUpMutation.isPending}
        />
      </div>
    </AuthLayout>
  );
};
