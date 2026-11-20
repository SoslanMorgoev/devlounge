import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

type AuthStore = {
  user: User | null;
  authLoading: boolean;
  setUser: (newUser: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  authLoading: true,
  setUser: (newUser) => set(() => ({ user: newUser, authLoading: false })),
}));
