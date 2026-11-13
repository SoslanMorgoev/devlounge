import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingStore = {
  autoReply: boolean;
  setAutoReply: (value: boolean) => void;
};
export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      autoReply: true,
      setAutoReply: (value) => set(() => ({ autoReply: value })),
    }),
    { name: "settingStore" },
  ),
);
