import { useMyInfoQuery } from '@/hooks/user';

export const BoardDetail = () => {
  const myInfoQuery = useMyInfoQuery();

  console.log('myInfoQuery', myInfoQuery);

  return <>dada</>;
};
