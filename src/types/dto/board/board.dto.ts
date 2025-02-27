import { IBoard } from '@/types/interface';

export interface ICreateBoard extends IBoard {}

export interface IUpdateBoard extends IBoard {
  boardSeq: number;
}
