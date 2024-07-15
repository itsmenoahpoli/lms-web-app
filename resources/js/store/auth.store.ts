import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

type AuthStore = {
  user?: undefined;
  token?: undefined;
  SET_USER: (user: any) => void;
  SET_TOKEN: (token: string) => void;
  CLEAR_AUTH: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: undefined,
      token: undefined,
      SET_USER: (user: any) => {
        set({ user });
      },
      SET_TOKEN: (token: any) => {
        set({ token });
      },
      CLEAR_AUTH: () => {
        set({ user: undefined, token: undefined });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

mountStoreDevtool("Store", useAuthStore);
