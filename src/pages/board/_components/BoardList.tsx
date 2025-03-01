import { useEffect, useRef } from 'react';
import { useBoardListQuery } from '@/hooks/board';
import { CommentSvg, HeartSvg } from '@/asset/svg';
import { Text } from '@/components/text';
import { useNavigate } from 'react-router-dom';

export const BoardList = () => {
  const navigate = useNavigate();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useBoardListQuery();

  const onClickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;
    event.stopPropagation();
    navigate(`/board/detail/${boardSeq}`);
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-6">
          {data?.map((page) =>
            page.data.data.boards.map((board) => (
              <div
                key={board.boardSeq}
                className="w-full flex flex-col gap-3"
                onClick={(event) => onClickHandler({ event, boardSeq: board.boardSeq })}>
                <div className="flex flex-col gap-1">
                  <Text className="font-bold" value={board.title} color="black" />
                  <Text className="line-clamp-2" value={board.content} color="gray" />
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <HeartSvg color="#989898" />
                      <Text value="0" color="gray" />
                    </div>
                    <div className="flex gap-1">
                      <CommentSvg color="#989898" />
                      <Text value={String(board.commentTotal)} color="gray" />
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Text value="조회수" color="black" />
                    <Text value={String(board.viewCount)} color="gray" />
                  </div>
                </div>
              </div>
            )),
          )}

          <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
            {isFetchingNextPage && <div>로딩 중...</div>}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
