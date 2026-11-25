import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useProfiles } from "../hooks/useProfiles";
import { useQuery } from "@tanstack/react-query";
import type { Message } from "../types";
import { supabase } from "../lib/supabase";
import { partnerOf } from "../utils/partnerOf";
import { useResetUnread } from "../hooks/useResetUnread";

export function ChatsPage() {
  useResetUnread();
  const me = useAuthStore((state) => state.user);
  const { data: profiles, isPending: profilesPending } = useProfiles();
  const { data: messages, isPending: messagesPending } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  if (profilesPending || messagesPending) return <p>Loading...</p>;
  if (!profiles || !messages) return <p>Something went wrong</p>;
  if (!me) return null;
  const chatIds = [...new Set(messages.map((m) => partnerOf(m, me.id)))];
  const chatUsers = profiles.filter((user) => chatIds.includes(user.id));

  return (
    <div className="chats">
      <h2>Chats</h2>
      {!chatUsers.length && <p>No chats yet</p>}
      <ul className="chatsList">
        {chatUsers.map((user) => {
          const lastMessage = messages
            .filter((m) => partnerOf(m, me.id) === user.id)
            .at(-1);
          return (
            <li key={user.id}>
              <Link to={`/chat/${user.id}`}>
                <div className="avatar">{user.name[0]}</div>
                <div className="chatInfo">
                  <h3>{user.name}</h3>
                  <p className="lastMessage">{lastMessage?.text}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
