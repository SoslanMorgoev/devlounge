import { expect, test } from "vitest";
import { partnerOf } from "./partnerOf";
import type { Message } from "../types";

test("если я отправитель, собеседник — получатель", () => {
  const message: Message = {
    id: "1",
    sender_id: "me",
    receiver_id: "ann",
    text: "hi",
    created_at: "2026-11-20",
  };

  expect(partnerOf(message, "me")).toBe("ann");
});
test("если я получатель, собеседник — отправитель", () => {
  const message: Message = {
    id: "2",
    sender_id: "ann",
    receiver_id: "me",
    text: "hi",
    created_at: "2026-11-20",
  };

  expect(partnerOf(message, "me")).toBe("ann");
});
