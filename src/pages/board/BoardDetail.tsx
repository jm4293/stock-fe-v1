import { useParams } from 'react-router-dom';
import { BoardCommentList, BoardContent } from '@/pages/board/_components';

export const BoardDetail = () => {
  const { boardSeq } = useParams();

  return (
    <div className="relative">
      <BoardContent boardSeq={boardSeq} />
      {boardSeq && <BoardCommentList boardSeq={boardSeq} />}
    </div>
  );
};
