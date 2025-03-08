import { AuthLayout } from '@/pages/auth';
import { Image } from '@/components/image';
import logo from '@/asset/images/sign-in-logo.png';
import { Margin } from '@/components/margin';
import { Input } from '@/components/input';
import { useState } from 'react';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { useAuthMutation } from '@/hooks/auth';
import { ImageTypeEnum } from 'constant/enum';
import { ISignUpDto } from '@/types/dto';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ISignUpDto>({
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

  const onEnterHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    navigate('/auth/login');
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-10">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full grid grid-cols-6 gap-2">
            <div className="col-span-4">
              <Input
                type="email"
                title="이메일"
                name="email"
                value={formData.email}
                onChange={(event) => onChangeHandler(event)}
                placeholder="이메일 주소"
                disabled={confirmDuplicateEmail}
              />
            </div>
            <div className="col-span-2">
              <Button
                text={`${confirmDuplicateEmail ? '완료' : '중복 확인'}`}
                onClick={(event) => onDuplicateCheckHandler(event)}
                disabled={onCheckEmailMutation.isPending}
              />
            </div>
          </div>
          <Input
            type="password"
            title="비밀번호"
            name="password"
            value={formData.password}
            onChange={(event) => onChangeHandler(event)}
            placeholder="비밀번호"
          />
          <Input
            type="password"
            title="비밀번호 확인"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="비밀번호 확인"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            type="text"
            title="닉네임"
            name="nickname"
            value={formData.nickname}
            onChange={(event) => onChangeHandler(event)}
            placeholder="닉네임"
          />
          <Input
            type="text"
            title="이름"
            name="name"
            value={formData.name}
            onChange={(event) => onChangeHandler(event)}
            placeholder="이름"
          />
          <Input
            type="text"
            title="생년월일 8자리"
            name="birthdate"
            value={formData.birthdate}
            onChange={(event) => onChangeHandler(event)}
            placeholder="생년월일 8자리"
            optional
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button text="회원가입" onClick={(event) => onSubmitHandler(event)} disabled={onSignUpMutation.isPending} />

          <Button text="뒤로가기" onClick={(event) => onEnterHandler(event)} />
        </div>
      </div>
    </AuthLayout>
  );
};
