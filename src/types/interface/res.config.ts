import { ResCodeEnum } from '@/types/enum/res-code.enum';

export interface ResConfig<T> {
  result: ResCodeEnum;
  message: string;
  data: T;
}
