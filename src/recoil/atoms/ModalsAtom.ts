import { atom } from "recoil";

export type ModalAtom = {
  id: string;
  Component: React.ComponentType;
  props: { [key: string]: unknown };
  isOpen: boolean;
};

const modalsAtom = atom<ModalAtom[]>({
  key: "modalsAtom",
  default: [],
});

export default modalsAtom;
