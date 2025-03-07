import { Text } from '@/components/text';
import { useBoardListMineQuery } from '@/hooks/board';
import { InfinityList, InfinityListWrapper } from '@/components/infinity-list';
import { AxiosResponse } from 'axios';
import { ResConfig } from '@/types/res.config';
import { IBoardListRes } from '@/types/res/board';
import { IBoard } from '@/types/interface';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const MyPageBoard = () => {
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoardListMineQuery();

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
        className="w-full flex flex-col gap-1 cursor-pointer"
        onClick={(event) => onClickHandler({ event, boardSeq: board.boardSeq })}>
        <Text className="font-bold" value={board.title} color="black" size="middle" />

        <Text className="col-span-5 line-clamp-2" value={board.content} color="gray" />

        <Text
          className="col-span-5 line-clamp-2"
          value={dayjs(board.createdAt).format('YY-MM-DD HH:mm')}
          color="black"
        />
      </div>
    ));
  };

  return (
    <InfinityListWrapper
      total={data?.[0].data.data.total}
      children={
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
