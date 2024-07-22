import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const INITIAL_USER: User = {
  updatedAt: null,
  createdAt: null,
  image: null,
  nickname: "",
  id: "",
};

export const INITIAL_USER_ATOM = {
  user: INITIAL_USER,
  accessToken: null,
  refreshToken: null,
};

export const userAtom = atom<typeof INITIAL_USER_ATOM>({
  key: "userAtom",
  default: INITIAL_USER_ATOM,
  effects_UNSTABLE: [persistAtom],
});
