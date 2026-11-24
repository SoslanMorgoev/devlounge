import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewMessage } from "../types";
import { supabase } from "../lib/supabase";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: NewMessage) => {
      const { error } = await supabase.from("messages").insert(message);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
