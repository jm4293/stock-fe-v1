import { IUser } from '@/types/interface';

interface IBoard {
  boardSeq: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  viewCount: number;
}

export interface IBoardListRes {
  boards: IBoard[];
  total: number;
  nextPage: number | null;
}

export interface IBoardDetailRes {
  board: IBoard;
}
