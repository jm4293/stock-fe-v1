import { useBoardCommentListQuery, useBoardCommentMutation } from '@/hooks/board';
import { Input } from '@/components/input';
import { useState } from 'react';
import { Text } from '@/components/text';
import { Image } from '@/components/image';
import { ImageTypeEnum } from '@/constant/enum';
import dayjs from 'dayjs';
import { CloseSvg } from '@/asset/svg';

interface IProps {
  boardSeq: string | undefined;
}

export const BoardCommentList = (props: IProps) => {
  const { boardSeq } = props;

  const [comment, setComment] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useBoardCommentListQuery({
    boardSeq: Number(boardSeq),
  });

  const { onCreateBoardCommentMutation, onUpdateBoardCommentMutation, onDeleteBoardCommentMutation } =
    useBoardCommentMutation();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    onCreateBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), content: comment });
    setComment('');
  };

  const onDeleteClickHandler = (params: {
    event: React.MouseEvent<SVGSVGElement, MouseEvent>;
    boardCommentSeq: number;
  }) => {
    const { event, boardCommentSeq } = params;

    event.stopPropagation();

    onDeleteBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq: Number(boardCommentSeq) });
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center gap-2">
        <Text value="댓글" color="black" size="large" />
        <Text value={`${String(data?.[0].data.data.total)}개`} color="gray" size="middle" />
      </div>

      <div className="flex flex-col gap-6">
        {data?.map((page) =>
          page.data.data.boardComments.length > 0 ? (
            page.data.data.boardComments.map((boardComment) => (
              <div key={boardComment.boardCommentSeq} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src={boardComment.user.thumbnail}
                      type={ImageTypeEnum.THUMBNAIL}
                      alt="board-comment-thumbnail"
                    />
                    <Text value={boardComment.user.nickname} color="black" />
                  </div>
                  <CloseSvg
                    color="#989898"
                    onClick={(event) => onDeleteClickHandler({ event, boardCommentSeq: boardComment.boardCommentSeq })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Text value={boardComment.content} color="black" />
                  <Text value={dayjs(boardComment.createdAt).format('YY년 MM월 DD일 HH시 mm분')} color="gray" />
                </div>
              </div>
            ))
          ) : (
            <Text value="댓글이 없습니다." color="gray" />
          ),
        )}
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '로딩중...' : '더보기'}
        </button>
      )}

      <Input
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="댓글을 입력해주세요"
        isConfirm
        onClick={(event) => onClickHandler(event)}
      />
    </div>
  );
};
