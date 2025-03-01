import { useSetAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';
import { jwtStore } from '@/store/jwt';
import { modalStore } from '@/store/modal';
import { useKisOauthTokenQuery } from '@/hooks/kis';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);
  const getJwtToken = useAtomValue(jwtStore.getJwt);

  const kisOauthTokenQuery = useKisOauthTokenQuery();

  console.log('getJwtToken', getJwtToken);

  return (
    <div>
      <p>홈</p>
      <button onClick={openModal}>Open Modal</button>
    </div>
  );
};
