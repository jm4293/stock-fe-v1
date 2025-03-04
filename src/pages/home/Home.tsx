import { useSetAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';
import { jwtStore } from '@/store/jwt';
import { modalStore } from '@/store/modal';
import { useKisOauthTokenQuery } from '@/hooks/kis';
import { toastStore } from '@/store/toast';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);

  const openToast = useSetAtom(toastStore.openToast);

  const getJwtToken = useAtomValue(jwtStore.getJwt);

  const kisOauthTokenQuery = useKisOauthTokenQuery();

  console.log('getJwtToken', getJwtToken);

  return (
    <div className="flex flex-col gap-4">
      <button onClick={openModal}>Open Modal</button>
      <button onClick={() => openToast('This is a toast message!')}>Open Toast</button>
    </div>
  );
};
