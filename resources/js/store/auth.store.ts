import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create<{}>()(
  persist((set, get) => ({}), {
    name: "auth-store",
    storage: createJSONStorage(() => localStorage),
  })
);
