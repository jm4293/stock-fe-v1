import { IBoard, IUser } from '@/types/interface';

export interface IBoardComment {
  boardCommentSeq: number;
  content: string;
  boardSeq: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
  user: IUser;
  board: IBoard;
}
