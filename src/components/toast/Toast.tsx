import { toastStore } from '@/store/toast';
import { useAtomValue } from 'jotai/index';
import { useSetAtom } from 'jotai';
import ReactDOM from 'react-dom';
import React from 'react';
import { IToastProps } from '@/components/toast/interface';

export const Toast = (props: IToastProps) => {
  const { children } = props;

  const isToastOpen = useAtomValue(toastStore.isToastAtom);
  const closeToast = useSetAtom(toastStore.closeToast);

  if (!isToastOpen) return null;

  return ReactDOM.createPortal(
    <div className="toast-overlay" onClick={closeToast}>
      <div className="toast-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('toast-root') as HTMLElement,
  );
};
