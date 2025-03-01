import { IBoard, IBoardComment } from '@/types/interface';

export interface IBoardListRes {
  boards: IBoard[];
  total: number;
  nextPage: number | null;
}

export interface IBoardDetailRes {
  board: IBoard;
}

export interface IBoardCommentListRes {
  boardComments: IBoardComment[];
  total: number;
  nextPage: number | null;
}
