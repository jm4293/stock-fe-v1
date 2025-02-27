import { AxiosConfig } from '@/common/axios-config';
import { ICreateBoard, IUpdateBoard } from '@/types/dto';
import { IBoardDetailRes, IBoardListRes } from '@/types/res/board';

class BoardApi extends AxiosConfig {
  private readonly _baseURL = '/board';

  async getBoardList(page: number) {
    return await this.get<IBoardListRes, { page: number }>({ url: `${this._baseURL}`, params: { page } });
  }

  async getBoardDetail(boardSeq: number) {
    return await this.get<IBoardDetailRes, null>({ url: `${this._baseURL}/${boardSeq}` });
  }

  async createBoard(dto: ICreateBoard) {
    return await this.post<null, ICreateBoard>({ url: `${this._baseURL}`, data: dto });
  }

  async updateBoard(dto: IUpdateBoard) {
    const { boardSeq, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoard, 'boardSeq'>>({ url: `${this._baseURL}/${boardSeq}`, data: res });
  }
}

export default new BoardApi();
