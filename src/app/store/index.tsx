import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  accessToken: string;
};

type UserState = {
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
};

export const useStoreSlice: StateCreator<UserState> = (set) => ({
  user: null,
  login: (accessToken: string) => set(() => ({ user: { accessToken } })),
  logout: () => set(() => ({ user: null })),
});

const persistedUserStore = persist<UserState>(useStoreSlice, {
  name: "user",
  getStorage: () => localStorage,
});

export const useUserStore = create(persistedUserStore);
