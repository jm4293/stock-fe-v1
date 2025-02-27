import { useMyInfoQuery } from '@/hooks/user';
import { Image } from '@/components/image';
import { ImageTypeEnum } from '@/constant/enum';
import { Input } from '@/components/input';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';
import { useParams } from 'react-router-dom';
import { useBoardDetailQuery, useBoardMutation } from '@/hooks/board';

export const BoardDetail = () => {
  const { boardSeq } = useParams();

  const myInfoQuery = useMyInfoQuery();
  const boardDetailQuery = useBoardDetailQuery({ boardSeq: Number(boardSeq) });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { onCreateBoardMutation, onUpdateBoardMutation } = useBoardMutation();

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (boardSeq) {
      onUpdateBoardMutation.mutate({ boardSeq: Number(boardSeq), title, content });
    } else {
      onCreateBoardMutation.mutate({ title, content });
    }
  };

  useEffect(() => {
    if (boardDetailQuery.isSuccess) {
      const { title, content } = boardDetailQuery.data;

      setTitle(title);
      setContent(content);
    }
  }, [boardDetailQuery.isSuccess]);

  return myInfoQuery.isSuccess ? (
    <div className="px-6 py-2 flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image type={ImageTypeEnum.THUMBNAIL} src={myInfoQuery.data.thumbnail} alt="board-detail-thumbnail" />
          <p>{myInfoQuery.data.name}</p>
        </div>
        <div className="col-span-5 flex flex-col gap-4">
          <Input
            type="text"
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
  ) : (
    <></>
  );
};
