import { atom } from 'jotai';

const toastAtom = atom({ isOpen: false, message: '' });

export const toastStore = {
  toastAtom,
  toastMessage: atom((get) => get(toastAtom).message),
  isOpenToast: atom((get) => get(toastAtom).isOpen),
  openToast: atom(null, (get, set, message: string) => {
    set(toastAtom, { isOpen: true, message });
  }),
  closeToast: atom(null, (get, set) => {
    set(toastAtom, { isOpen: false, message: '' });
  }),
};
