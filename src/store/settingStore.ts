import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingStore = {
  newsTag: string;
  setNewsTag: (value: string) => void;
};
export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      newsTag: "",
      setNewsTag: (value) => set(() => ({ newsTag: value })),
    }),
    { name: "settingStore" },
  ),
);
