import { useEffect } from "react";
import { useNotificationStore } from "../store/notificationStore";

export function useResetUnread() {
  const reset = useNotificationStore((state) => state.reset);
  useEffect(() => {
    reset();
  }, []);
}
