import { useDeviceLayout } from '@/hooks/useDeviceLayout';
import { useNavigate } from 'react-router-dom';
import { BoardButton } from '@/asset/svg/button';
import { useBoardListQuery } from '@/hooks/board';

export const Board = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceLayout();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useBoardListQuery();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    navigate('/board/detail');
  };

  return (
    <div className="">
      {status === 'success' ? (
        <div className="flex flex-col items-center" style={{ border: '1px solid red' }}>
          {data?.pages.map((page) =>
            page.data.data.boards.map((board) => <div key={board.boardSeq}>{board.title}</div>),
          )}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? '로딩중...' : '더보기'}
            </button>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className={`${isMobile ? 'bottom-24' : 'bottom-36'} absolute right-10`}>
        <BoardButton color="#9470DC" onClick={onClickHandler} />
      </div>
    </div>
  );
};
