import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Message } from "../types";

type ChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearAll: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearAll: () => set(() => ({ messages: [] })),
    }),
    { name: "devlounge-chat" },
  ),
);
