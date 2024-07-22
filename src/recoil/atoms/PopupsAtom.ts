import { atom } from "recoil";

export type PopupAtom = {
  id: string;
  message: string;
  duration?: number;
  onClose: () => void;
};

const popupsAtom = atom<PopupAtom[]>({
  key: "popupsAtom",
  default: [],
});

export default popupsAtom;
