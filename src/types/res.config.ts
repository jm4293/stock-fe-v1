import { ResCodeEnum } from '@/constant/enum';

export interface ResConfig<T> {
  result: ResCodeEnum;
  message: string;
  data: T;
}
