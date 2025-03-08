import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { useNavigate } from 'react-router-dom';
import { BoardList } from '@/pages/board/_components';
import { BoardRegisterSvg } from '@/asset/svg';

export const Board = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();

  const state = localStorage.getItem('state');

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    navigate('/board/detail');
  };

  return (
    <div>
      <BoardList />

      {state && (
        <div className={`${isMobile ? 'bottom-24' : 'bottom-36'} absolute right-4`}>
          <BoardRegisterSvg color="#989898" onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
};
