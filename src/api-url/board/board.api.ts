import { AxiosConfig } from '@/common/axios-config';
import { IBoardDetailRes, IBoardListRes } from '@/types/res/board';
import { ICreateBoardDto, IUpdateBoardDto } from '@/types/dto';

class BoardApi extends AxiosConfig {
  private readonly _baseURL = '/board';

  async getBoardList(page: number) {
    return await this.get<IBoardListRes, { page: number }>({ url: `${this._baseURL}`, params: { page } });
  }

  async getBoardDetail(boardSeq: number) {
    return await this.get<IBoardDetailRes, null>({ url: `${this._baseURL}/${boardSeq}` });
  }

  async createBoard(dto: ICreateBoardDto) {
    return await this.post<null, ICreateBoardDto>({ url: `${this._baseURL}`, data: dto });
  }

  async updateBoard(dto: IUpdateBoardDto) {
    const { boardSeq, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoardDto, 'boardSeq'>>({ url: `${this._baseURL}/${boardSeq}`, data: res });
  }
}

export default new BoardApi();
