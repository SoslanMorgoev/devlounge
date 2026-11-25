import { create } from "zustand";

type NotificationStore = {
  unread: number;
  increment: () => void;
  reset: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  unread: 0,
  increment: () => set((state) => ({ unread: state.unread + 1 })),
  reset: () => set(() => ({ unread: 0 })),
}));
