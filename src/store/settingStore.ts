import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingStore = {
  autoReply: boolean;
  newsTag: string;
  setAutoReply: (value: boolean) => void;
  setNewsTag: (value: string) => void;
};
export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      autoReply: true,
      newsTag: "",
      setAutoReply: (value) => set(() => ({ autoReply: value })),
      setNewsTag: (value) => set(() => ({ newsTag: value })),
    }),
    { name: "settingStore" },
  ),
);
