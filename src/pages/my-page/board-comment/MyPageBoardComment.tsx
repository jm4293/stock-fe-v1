import { useNavigate } from 'react-router-dom';
import { useBoardCommentListMineQuery } from '@/hooks/board';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IBoardCommentListRes } from '@/types/res/board';
import { IBoardComment } from '@/types/interface';
import { Text } from '@/components/text';
import { InfinityList } from '@/components/infinity-list';
import dayjs from 'dayjs';

export const MyPageBoardComment = () => {
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardCommentListMineQuery();

  const onClickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    navigate(`/board/detail/${boardSeq}`);
  };

  const renderItem = (page: AxiosResponse<ResConfig<IBoardCommentListRes>, any>) => {
    const { boardComments } = page.data.data;

    return boardComments.map((boardComment: IBoardComment) => (
      <div
        key={boardComment.boardCommentSeq}
        className="w-full flex flex-col gap-3 cursor-pointer"
        onClick={(event) => onClickHandler({ event, boardSeq: boardComment.board.boardSeq })}>
        <div className="flex flex-col gap-1">
          <Text className="line-clamp-1" value={boardComment.content} color="black" />

          <div className="flex gap-1">
            <Text value="게시글: " color="black" />
            <Text className="col-span-5 line-clamp-2" value={boardComment.board.title} color="gray" />
          </div>

          <Text
            className="col-span-5 line-clamp-2"
            value={dayjs(boardComment.board.createdAt).format('YY-MM-DD HH:mm')}
            color="black"
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1">
        <Text value="작성한 댓글" color="black" size="large" />
        <div className="flex">
          <Text value={String(data?.[0].data.data.total ?? 0)} color="gray" />
          <Text value="개" color="gray" />
        </div>
      </div>

      <InfinityList<AxiosResponse<ResConfig<IBoardCommentListRes>, any>>
        data={data || []}
        renderItem={renderItem}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
