import { useBoardListQuery, useBoardMutation } from '@/hooks/board';
import { CommentSvg, HeartSvg } from '@/asset/svg';
import { Text } from '@/components/text';
import { useNavigate } from 'react-router-dom';
import { InfinityList, InfinityListWrapper } from '@/components/infinity-list';
import { IBoard } from '@/types/interface';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IBoardListRes } from '@/types/res/board';

export const BoardList = () => {
  const navigate = useNavigate();

  const state = sessionStorage.getItem('state');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListQuery();

  const { onBoardLikeMutation } = useBoardMutation();

  const onLikeClickHandler = (params: { event: React.MouseEvent<SVGSVGElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    if (!state) {
      return;
    }

    onBoardLikeMutation.mutate(boardSeq);
  };

  const onClickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    navigate(`/board/detail/${boardSeq}`);
  };

  const renderItem = (page: AxiosResponse<ResConfig<IBoardListRes>, any>) => {
    const { boards, total } = page.data.data;

    return total > 0
      ? boards.map((board: IBoard) => (
          <div
            key={board.boardSeq}
            className="w-full flex flex-col gap-3 cursor-pointer"
            onClick={(event) => onClickHandler({ event, boardSeq: board.boardSeq })}>
            <div className="flex flex-col gap-1">
              <Text className="font-bold" value={board.title} color="#000000" />
              <div className="grid grid-cols-6">
                <Text className="col-span-5 line-clamp-2" value={board.content} color="#000000" />

                <div className="flex justify-end gap-1 col-span-1">
                  <Text value="작성자" color="#000000" />
                  <Text value={board.user.nickname} color="#000000" />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <HeartSvg
                    color="#989898"
                    onClick={(event) => onLikeClickHandler({ event, boardSeq: board.boardSeq })}
                    isFilled={board.isLiked}
                  />
                  <Text value={String(board.likeCount)} color="#000000" />
                </div>
                <div className="flex gap-1">
                  <CommentSvg color="#989898" />
                  <Text value={String(board.commentCount)} color="#000000" />
                </div>
              </div>
              <div className="flex gap-1">
                <Text value="조회수" color="#000000" />
                <Text value={String(board.viewCount)} color="#000000" />
              </div>
            </div>
          </div>
        ))
      : [<Text value="게시글이 없습니다." color="#000000" />];
  };

  return (
    <InfinityListWrapper
      total={data?.[0].data.data.total}
      renderList={
        <InfinityList<AxiosResponse<ResConfig<IBoardListRes>, any>>
          data={data || []}
          renderItem={renderItem}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
    />
  );
};
