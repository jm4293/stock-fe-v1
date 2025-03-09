import { useSetAtom } from 'jotai';
import { modalStore } from '@/store/modal';
import { toastStore } from '@/store/toast';
import { useFileUpload } from '@/hooks/image/useImageUpload';

export const Home = () => {
  const openModal = useSetAtom(modalStore.openModal);

  const openToast = useSetAtom(toastStore.openToast);

  const { FileUploadButton, responseURL } = useFileUpload();

  return (
    <div className="flex flex-col gap-4">
      <button onClick={openModal}>Open Modal</button>
      <button onClick={() => openToast('This is a toast message!')}>Open Toast</button>

      <FileUploadButton />

      {responseURL && (
        <div>
          <h3>리사이징된 이미지 URL:</h3>
          <p>{responseURL}</p>
        </div>
      )}
    </div>
  );
};
