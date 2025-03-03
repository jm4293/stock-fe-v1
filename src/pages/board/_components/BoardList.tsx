import { useBoardListQuery } from '@/hooks/board';
import { CommentSvg, HeartSvg } from '@/asset/svg';
import { Text } from '@/components/text';
import { useNavigate } from 'react-router-dom';
import { InfinityList } from '@/components/infinity-list';
import { IBoard } from '@/types/interface';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IBoardListRes } from '@/types/res/board';

export const BoardList = () => {
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListQuery();

  const onClickHandler = (params: { event: React.MouseEvent<HTMLDivElement, MouseEvent>; boardSeq: number }) => {
    const { event, boardSeq } = params;

    event.stopPropagation();

    navigate(`/board/detail/${boardSeq}`);
  };

  const renderItem = (page: AxiosResponse<ResConfig<IBoardListRes>, any>) => {
    const { boards } = page.data.data;

    return boards.map((board: IBoard) => (
      <div
        key={board.boardSeq}
        className="w-full flex flex-col gap-3 cursor-pointer"
        onClick={(event) => onClickHandler({ event, boardSeq: board.boardSeq })}>
        <div className="flex flex-col gap-1">
          <Text className="font-bold" value={board.title} color="black" size="middle" />
          <div className="grid grid-cols-6">
            <Text className="col-span-5 line-clamp-2" value={board.content} color="gray" />
            <Text className="col-span-1 text-end" value={board.user.nickname} color="black" />
          </div>
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
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1">
        <Text value="총" color="black" size="large" />
        <div className="flex">
          <Text value={String(data?.[0].data.data.total ?? 0)} color="gray" />
          <Text value="개" color="gray" />
        </div>
      </div>

      <InfinityList<AxiosResponse<ResConfig<IBoardListRes>, any>>
        data={data || []}
        renderItem={renderItem}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
