import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ICreateBoard, IUpdateBoard } from '@/types/dto';
import BoardApi from '@/api-url/board/board.api';

export const useBoardMutation = () => {
  const navigate = useNavigate();

  const onCreateBoardMutation = useMutation({
    mutationFn: (dto: ICreateBoard) => BoardApi.createBoard(dto),
    onSuccess: () => {
      navigate('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onUpdateBoardMutation = useMutation({
    mutationFn: (dto: IUpdateBoard) => BoardApi.updateBoard(dto),
    onSuccess: () => {
      navigate('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    onCreateBoardMutation,
    onUpdateBoardMutation,
  };
};
