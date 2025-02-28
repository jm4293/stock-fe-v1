import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import BoardApi from '@/api-url/board/board.api';
import { ICreateBoardDto, IUpdateBoardDto } from '@/types/dto';

export const useBoardMutation = () => {
  const navigate = useNavigate();

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
