import { useQuery } from "@tanstack/react-query";
import type { Message } from "../types";
import { supabase } from "../lib/supabase";

export function useConversation(id: string | undefined) {
  return useQuery<Message[]>({
    queryKey: ["messages", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${id},receiver_id.eq.${id}`)
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });
}
