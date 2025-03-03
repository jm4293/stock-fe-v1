import { atom } from 'jotai';

const isModalAtom = atom(false);

export const modalStore = {
  isModalAtom,
  openModal: atom(null, (get, set) => {
    set(isModalAtom, true);
  }),
  closeModal: atom(null, (get, set) => {
    set(isModalAtom, false);
  }),
};
