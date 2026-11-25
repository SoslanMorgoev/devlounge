import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";

export function useMessageRealtime() {
  const queryClient = useQueryClient();
  const me = useAuthStore((state) => state.user);
  const increment = useNotificationStore((state) => state.increment);
  useEffect(() => {
    const channel = supabase
      .channel("message-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" &&
            payload.new.sender_id !== me?.id
          ) {
            new Audio("/notice.mp3").play();
            increment();
          }
          queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [me?.id]);
}
