import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Text } from '@/components/text';
import { BackSvg, BellSvg } from '@/asset/svg';

const headerPathName: { [key: string]: string } = {
  '/home': '홈',
  '/stock': '주식',
  '/board': '게시판',
  '/board/detail': '게시판 작성',
  '/mypage': '마이페이지',
  '/mypage/board': '작성한 게시글',
  '/mypage/comment': '작성한 댓글',
  '/notification': '알림',
};

export const Header = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = localStorage.getItem('state');

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

  const getHeaderTitle = (pathname: string) => {
    if (pathname.startsWith('/board/detail/')) {
      return '게시판 상세';
    }

    if (pathname === '/board/detail') {
      return '게시판 등록';
    }

    return headerPathName[pathname] || '';
  };

  return (
    <div className="header">
      <BackSvg color="#000000" onClick={(event) => onBackButtonClick(event)} />
      <Text value={getHeaderTitle(location.pathname)} color="#000000" size="lg" />
      <BellSvg color="#989898" onClick={(event) => onBellButtonClick(event)} />
    </div>
  );
};
