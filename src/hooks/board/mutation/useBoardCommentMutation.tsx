import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateBoardCommentDto, IUpdateBoardCommentDto } from '@/types/dto';
import BoardApi from '@/api-url/board/board.api';

export const useBoardCommentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onCreateBoardCommentMutation = useMutation({
    mutationFn: (dto: ICreateBoardCommentDto) => BoardApi.createBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries({ queryKey: ['board-comment-list'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onUpdateBoardCommentMutation = useMutation({
    mutationFn: (dto: IUpdateBoardCommentDto) => BoardApi.updateBoardComment(dto),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onDeleteBoardCommentMutation = useMutation({
    mutationFn: (params: { boardSeq: number; boardCommentSeq: number }) => BoardApi.deleteBoardComment(params),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['board-comment-list'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    onCreateBoardCommentMutation,
    onUpdateBoardCommentMutation,
    onDeleteBoardCommentMutation,
  };
};
