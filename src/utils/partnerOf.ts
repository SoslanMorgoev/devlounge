import type { Message } from "../types";

export function partnerOf(message: Message, myId: string) {
  return message.sender_id === myId ? message.receiver_id : message.sender_id;
}
