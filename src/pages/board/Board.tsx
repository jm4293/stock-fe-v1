import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai/index';
import { jwtStore } from '@/store/jwt';
import { BoardList } from '@/pages/board/_components';
import { BoardButton } from '@/asset/svg';

export const Board = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();

  const jwt = useAtomValue(jwtStore.getJwt);

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    navigate('/board/detail');
  };

  return (
    <div className="pt-2">
      <BoardList />

      {jwt && (
        <div className={`${isMobile ? 'bottom-24' : 'bottom-36'} absolute right-4`}>
          <BoardButton color="#9470DC" onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
};
