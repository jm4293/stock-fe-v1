import { atom } from 'jotai';

const isToastAtom = atom(false);

export const toastStore = {
  isToastAtom,
  openToast: atom(null, (get, set) => {
    set(isToastAtom, true);
  }),
  closeToast: atom(null, (get, set) => {
    set(isToastAtom, false);
  }),
};
