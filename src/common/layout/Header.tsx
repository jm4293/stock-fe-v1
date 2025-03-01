import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Text } from '@/components/text';
import { useAtomValue } from 'jotai/index';
import { jwtStore } from '@/store/jwt';
import { Button } from '@/components/button';
import { useAuthMutation } from '@/hooks/auth';
import { BackSvg } from '@/asset/svg';

export const Header = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const jwt = useAtomValue(jwtStore.getJwt);

  const { onLogoutMutation } = useAuthMutation();

  const pathName = () => {
    const { pathname } = location;

    const depth_1 = pathname.split('/')[1];

    switch (depth_1) {
      case 'home':
        return '홈';
      case 'stock':
        return '주식';
      case 'board':
        return '게시판';
      case 'mypage':
        return '마이페이지';
      default:
        return '홈';
    }
  };

  const onBackButtonClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    navigate(-1);
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    const { name } = event.currentTarget;

    switch (name) {
      case '로그인':
        navigate('/auth/login');
        break;
      case '로그아웃':
        onLogoutMutation.mutate();
        break;
      default:
        break;
    }
  };

  return (
    <div className="header">
      <BackSvg color="#989898" onClick={(event) => onBackButtonClick(event)} />

      <Text value={pathName()} color="gray" size="large" />

      <div>
        {jwt ? (
          <Button text="로그아웃" color="gray" onClick={(event) => onButtonClick(event)} />
        ) : (
          <Button text="로그인" color="gray" onClick={(event) => onButtonClick(event)} />
        )}
      </div>
    </div>
  );
};
