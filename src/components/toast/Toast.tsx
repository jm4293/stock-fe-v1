import { toastStore } from '@/store/toast';
import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from 'react';
import { onMessageListener, requestForToken } from '@/common/firebase-config';
import { useSetAtom } from 'jotai';
import { useAtomValue } from 'jotai/index';

interface IProps {
  message: string;
}

export const Toast = (props: IProps) => {
  const { message } = props;

  const isOpenToast = useAtomValue(toastStore.isOpenToast);

  const openToast = useSetAtom(toastStore.openToast);
  const closeToast = useSetAtom(toastStore.closeToast);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      const token = await requestForToken();

      return token;
    })();
  }, []);

  useEffect(() => {
    const messageListener = (payload: any) => {
      console.log('Received in foreground:', payload);
      openToast(payload.notification.body);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        closeToast();
      }, 3000);
    };

    const unsubscribe = onMessageListener(messageListener);

    return () => {
      unsubscribe();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [openToast, closeToast]);

  useEffect(() => {
    if (isOpenToast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpenToast, closeToast]);

  if (!isOpenToast) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="toast-wrapper">
      <p className="whitespace-nowrap">{message}</p>
    </div>,
    document.getElementById('toast-root') as HTMLElement,
  );
};
