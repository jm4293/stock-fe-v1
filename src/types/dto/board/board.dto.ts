import { IBoard } from '@/types/interface';

export interface ICreateBoardDto extends IBoard {}

export interface IUpdateBoardDto extends IBoard {
  boardSeq: number;
}
