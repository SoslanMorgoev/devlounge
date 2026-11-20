import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useProfiles } from "../hooks/useProfiles";
import { useQuery } from "@tanstack/react-query";
import type { Message } from "../types";
import { supabase } from "../lib/supabase";


export function ChatsPage() {
    const me = useAuthStore((state) => state.user);
    const { data: profiles, isPending: profilesPending } = useProfiles();
    const { data: messages, isPending: messagesPending } = useQuery<Message[]>({
        queryKey: ["messages"],
        queryFn: async () => {
            const { data, error } = await supabase.from("messages").select("*").order("created_at");
            if (error) throw error;
            return data;
        }
    });
    if (profilesPending || messagesPending) return <p>Loading...</p>
    if (!profiles || !messages) return <p>Something went wrong</p>

    function partnerOf(message: Message) {
        return message.sender_id === me?.id ? message.receiver_id : message.sender_id;
    }
    const chatIds = [...new Set(messages.map(m => partnerOf(m)))];
    const chatUsers = profiles.filter(user => chatIds.includes(user.id));
    return (
        <div className="chats">
            <h2>Chats</h2>
            {!chatUsers.length && <p>No chats yet</p>}
            <ul className="chatsList">
                {chatUsers.map(user => {
                    const lastMessage = messages.filter(m => partnerOf(m) === user.id).at(-1);
                    return (
                        <li key={user.id}>
                            <Link to={`/chat/${user.id}`}>
                                <div className="avatar">{user.name[0]}</div>
                                <div className="chatInfo">
                                    <h3>{user.name}</h3>
                                    <p className="lastMessage">{lastMessage?.text}</p></div>
                            </Link>


                        </li>
                    );
                })}
            </ul>
        </div >
    );
}
