import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';
import { ICreateBoardDto, IUpdateBoardDto } from '@/types/dto';

export const useBoardMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onCreateBoardMutation = useMutation({
    mutationFn: (dto: ICreateBoardDto) => BoardApi.createBoard(dto),
    onSuccess: () => {
      navigate('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onUpdateBoardMutation = useMutation({
    mutationFn: (dto: IUpdateBoardDto) => BoardApi.updateBoard(dto),
    onSuccess: async (_, variables) => {
      alert('게시글이 수정되었습니다.');

      await queryClient.invalidateQueries({ queryKey: ['board-detail', variables.boardSeq] });
      navigate('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onDeleteBoardMutation = useMutation({
    mutationFn: (boardSeq: number) => BoardApi.deleteBoard({ boardSeq }),
    onSuccess: () => {
      navigate('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onBoardLikeMutation = useMutation({
    mutationFn: (boardSeq: number) => BoardApi.boardLike(boardSeq),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board-list'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    onCreateBoardMutation,
    onUpdateBoardMutation,
    onDeleteBoardMutation,
    onBoardLikeMutation,
  };
};
