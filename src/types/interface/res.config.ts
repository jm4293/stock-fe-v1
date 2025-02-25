import { ResCodeEnum } from '@/types/enum';

export interface ResConfig<T> {
  result: ResCodeEnum;
  message: string;
  data: T;
}
