import { Image } from '@/components/image';
import { ImageTypeEnum } from '@/constant/enum';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';
import { useBoardDetailQuery, useBoardMutation } from '@/hooks/board';
import { useEffect, useState } from 'react';
import { Text } from '@/components/text';
import { CloseSvg } from '@/asset/svg';

interface IProps {
  boardSeq: string | undefined;
}

export const BoardContent = (props: IProps) => {
  const { boardSeq } = props;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const boardDetailQuery = useBoardDetailQuery({ boardSeq: Number(boardSeq) });

  const { onCreateBoardMutation, onUpdateBoardMutation, onDeleteBoardMutation } = useBoardMutation();

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (boardSeq) {
      onUpdateBoardMutation.mutate({ boardSeq: Number(boardSeq), title, content });
    } else {
      onCreateBoardMutation.mutate({ title, content });
    }
  };

  const onDeleteClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    if (confirm('게시글을 삭제하시겠습니까?')) {
      onDeleteBoardMutation.mutate(Number(boardSeq));
    }
  };

  useEffect(() => {
    if (boardDetailQuery.isSuccess) {
      const { title, content } = boardDetailQuery.data;

      setTitle(title);
      setContent(content);
    }
  }, [boardDetailQuery.isSuccess]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Text value="게시글" color="#000000" size="lg" />
        {boardSeq && <CloseSvg color="#989898" onClick={(event) => onDeleteClickHandler(event)} />}
      </div>

      <div className={`${boardSeq ? 'grid grid-cols-6 gap-4' : ''}`}>
        {boardSeq && boardDetailQuery.isSuccess && (
          <div className="flex flex-col justify-center items-center gap-2">
            <Image type={ImageTypeEnum.THUMBNAIL} src={boardDetailQuery.data.thumbnail} alt="board-detail-thumbnail" />
            <p>{boardDetailQuery.data?.nickname}</p>
          </div>
        )}

        <div className="col-span-5 flex flex-col gap-2">
          <Input
            type="text"
            title="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="내용을 입력해주세요"
          />
        </div>
      </div>

      <Button text={`${boardSeq ? '수정' : '저장'}하기`} onClick={(event) => onClickHandler(event)} />
    </div>
  );
};
