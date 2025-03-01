import { useBoardListQuery } from '@/hooks/board';
import { CommentSvg, HeartSvg } from '@/asset/svg';
import { Text } from '@/components/text';
import { useNavigate } from 'react-router-dom';

interface IProps {}

export const BoardList = () => {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useBoardListQuery();

  const onClickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    navigate(`/board/detail/${boardSeq}`);
  };

  console.log('data', data);

  return (
    <div className="pt-2">
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-10">
          {data?.map((page) =>
            page.data.data.boards.map((board) => (
              <div
                key={board.boardSeq}
                className="w-full px-6 flex flex-col gap-6"
                onClick={(event) => onClickHandler({ event, boardSeq: board.boardSeq })}>
                <div className="flex flex-col gap-2">
                  <Text className="font-bold" value={board.title} color="black" />
                  <Text className="line-clamp-2" value={board.content} color="gray" />
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <HeartSvg color="#9470DC" />
                      <Text value="0" color="gray" />
                    </div>
                    <div className="flex gap-1">
                      <CommentSvg color="#9470DC" />
                      <Text value={String(board.commentTotal)} color="gray" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Text value="조회수" color="black" />
                    <Text value={String(board.viewCount)} color="gray" />
                  </div>
                </div>
              </div>
            )),
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
    </div>
  );
};
