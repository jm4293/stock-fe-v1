import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Text } from '@/components/text';
import { BackSvg, BellSvg } from '@/asset/svg';

export const Header = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = localStorage.getItem('state');

  const pathName = () => {
    const { pathname } = location;

    const currentPath = pathname.split('/')[1];

    switch (currentPath) {
      case 'home':
        return '홈';
      case 'stock':
        return '주식';
      case 'board':
        return '게시판';
      case 'mypage':
        return '마이페이지';
      case 'notification':
        return '알림';
      default:
        return '홈';
    }
  };

  const onBackButtonClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    navigate(-1);
  };

  const onBellButtonClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    if (!state) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/auth/login');
    } else {
      navigate('/notification');
    }
  };

  return (
    <div className="header">
      <BackSvg color="#000000" onClick={(event) => onBackButtonClick(event)} />

      <Text value={pathName()} color="#000000" size="lg" />

      <BellSvg color="#989898" onClick={(event) => onBellButtonClick(event)} />
    </div>
  );
};
