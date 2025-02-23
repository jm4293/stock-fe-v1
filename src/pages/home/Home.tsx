import { useSetAtom } from 'jotai';
import { modalStore } from '@/store';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);

  return (
    <>
      <div className="h-[1520px] bg-amber-50">
        <p>홈</p>
        <button onClick={openModal}>Open Modal</button>
      </div>
    </>
  );
};
