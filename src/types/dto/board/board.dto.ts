export interface ICreateBoardDto {
  title: string;
  content: string;
}

export interface IUpdateBoardDto {
  title: string;
  content: string;
  boardSeq: number;
}

export interface ICreateBoardCommentDto {
  content: string;
  boardSeq: number;
}

export interface IUpdateBoardCommentDto {
  content: string;
  boardSeq: number;
  boardCommentSeq: number;
}
