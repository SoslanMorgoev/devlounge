import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Message } from "../types";

type ChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    }),
    { name: "devlounge-chat" },
  ),
);
