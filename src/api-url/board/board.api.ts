import { AxiosConfig } from '@/common/axios-config';
import { IBoardCommentListRes, IBoardDetailRes, IBoardListRes } from '@/types/res/board';
import { ICreateBoardCommentDto, ICreateBoardDto, IUpdateBoardCommentDto, IUpdateBoardDto } from '@/types/dto';

class BoardApi extends AxiosConfig {
  private readonly _baseURL = '/board';

  // 게시판
  async getBoardList(pageParam: number) {
    return await this.get<IBoardListRes, { pageParam: number }>({ url: `${this._baseURL}`, params: { pageParam } });
  }

  async getBoardListMine(pageParam: number) {
    return await this.get<IBoardListRes, { pageParam: number }>({
      url: `${this._baseURL}/mine`,
      params: { pageParam },
    });
  }

  async getBoardDetail(boardSeq: number) {
    return await this.get<IBoardDetailRes, null>({ url: `${this._baseURL}/${boardSeq}` });
  }

  async createBoard(dto: ICreateBoardDto) {
    return await this.post<null, Pick<ICreateBoardDto, 'title' | 'content'>>({ url: `${this._baseURL}`, data: dto });
  }

  async updateBoard(dto: IUpdateBoardDto) {
    const { boardSeq, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoardDto, 'boardSeq'>>({ url: `${this._baseURL}/${boardSeq}`, data: res });
  }

  async deleteBoard(params: { boardSeq: number }) {
    const { boardSeq } = params;

    return await this.delete<null, null>({ url: `${this._baseURL}/${boardSeq}` });
  }

  // 게시판 댓글
  async getBoardCommentList(params: { boardSeq: number; pageParam: number }) {
    const { boardSeq, pageParam } = params;

    return await this.get<IBoardCommentListRes, { pageParam: number }>({
      url: `${this._baseURL}/${boardSeq}/comments`,
      params: { pageParam },
    });
  }

  async getBoardCommentListMine(pageParam: number) {
    return await this.get<IBoardCommentListRes, { pageParam: number }>({
      url: `${this._baseURL}/comment/mine`,
      params: { pageParam },
    });
  }

  async createBoardComment(dto: ICreateBoardCommentDto) {
    const { boardSeq, ...res } = dto;

    return await this.post<null, Omit<ICreateBoardCommentDto, 'boardSeq'>>({
      url: `${this._baseURL}/${boardSeq}/comment`,
      data: res,
    });
  }

  async updateBoardComment(dto: IUpdateBoardCommentDto) {
    const { boardSeq, boardCommentSeq, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoardCommentDto, 'boardSeq' | 'boardCommentSeq'>>({
      url: `${this._baseURL}/${boardSeq}/comment/${boardCommentSeq}`,
      data: res,
    });
  }

  async deleteBoardComment(params: { boardSeq: number; boardCommentSeq: number }) {
    const { boardSeq, boardCommentSeq } = params;

    return await this.delete<null, null>({ url: `${this._baseURL}/${boardSeq}/comment/${boardCommentSeq}` });
  }

  // 게시판 좋아요(찜)
  async boardLike(boardSeq: number) {
    return await this.post<null, {}>({ url: `${this._baseURL}/${boardSeq}/like`, data: {} });
  }
}

export default new BoardApi();
