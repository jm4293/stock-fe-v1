import { useSetAtom } from 'jotai';
import { modalStore } from '@/store/modal';
import { toastStore } from '@/store/toast';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);

  const openToast = useSetAtom(toastStore.openToast);

  // const getJwtToken = useAtomValue(jwtStore.getJwt);

  // console.log('getJwtToken', getJwtToken);

  return (
    <div className="flex flex-col gap-4">
      <button onClick={openModal}>Open Modal</button>
      <button onClick={() => openToast('This is a toast message!')}>Open Toast</button>
    </div>
  );
};
