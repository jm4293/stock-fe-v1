import React from 'react';
import ReactDOM from 'react-dom';
import { IModalProps } from './interface';
import { useAtomValue, useSetAtom } from 'jotai';
import { modalStore } from '@/store/modal';

export const Modal = (props: IModalProps) => {
  const { children } = props;

  const isModalOpen = useAtomValue(modalStore.isModalAtom);
  const closeModal = useSetAtom(modalStore.closeModal);

  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
