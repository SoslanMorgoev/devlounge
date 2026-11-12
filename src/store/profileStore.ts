import { create } from "zustand";
import type { Category } from "../types";
import { persist } from "zustand/middleware";

export type Profile = {
  id: string;
  name: string;
  email: string;
  category: Category;
  status: string;
};
type ProfileStore = {
  profile: Profile;
  addToProfile: (newProfile: Profile) => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        id: "",
        name: "",
        category: "frontend",
        email: "",
        status: "",
      },
      addToProfile: (newProfile: Profile) =>
        set(() => ({ profile: newProfile })),
    }),
    { name: "profileStore" },
  ),
);
