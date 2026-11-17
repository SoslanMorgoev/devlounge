import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

type AuthStore = {
  user: User | null;
  setUser: (newUser: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (newUser) => set(() => ({ user: newUser })),
}));
