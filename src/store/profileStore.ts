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
  editProfile: (profile: Profile) => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        id: "1fdu8",
        name: "Samson",
        category: "frontend",
        email: "SamsonS@mail.com",
        status: "Creating this project",
      },
      addToProfile: (newProfile: Profile) =>
        set(() => ({ profile: newProfile })),
      editProfile: (profile: Profile) => set(() => ({ profile: profile })),
    }),

    { name: "profileStore" },
  ),
);
