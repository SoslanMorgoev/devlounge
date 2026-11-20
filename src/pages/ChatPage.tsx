import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { useProfile } from "../hooks/useProfile";
import { useAuthStore } from "../store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Message } from "../types";
import { supabase } from "../lib/supabase";

function ChatPage() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const { id } = useParams();
    const me = useAuthStore((state) => state.user);
    const { data: messages } = useQuery<Message[]>({
        queryKey: ["messages", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("messages").select("*").or(`sender_id.eq.${id},receiver_id.eq.${id}`).order("created_at");
            if (error) throw error;
            return data;
        }

    })
    const userId = id ?? "";
    const [messageInput, setMessageInput] = useState("");
    const lastMessage = messages?.at(-1);
    const { data: user, isPending, isError } = useProfile(id);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lastMessage?.id]);

    if (isPending) return <p>Loading...</p>
    if (isError) return <p>User not found!</p>

    return (
        <div className="conversation">
            <div className="conversationHead">
                <Link to={"/"}>⬅️</Link>
                <span>
                    <Link to={`/profile/${userId}`}>{user.name}</Link>
                </span>


            </div>
            <div className="conversationMain">
                <ul className="chat">
                    {messages?.map((message) =>
                        <li className={message.sender_id === me?.id ? "msgme" : "msgthem"} key={message.id}>{message.text}</li>

                    )}
                    <div ref={bottomRef}></div>
                </ul>
            </div>
            <form className="conversationForm" onSubmit={async (e) => {
                e.preventDefault();
                const text = messageInput.trim();
                if (!text || !me || !id) return;

                const { error } = await supabase.from("messages").insert({ sender_id: me.id, receiver_id: id, text });
                if (error) {
                    console.log(error.message);
                    return;
                }
                setMessageInput("");
                queryClient.invalidateQueries({ queryKey: ["messages", id] });
            }}>
                <input ref={inputRef} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <button type="submit">✉️</button>
            </form>

        </div >
    )
}
export default ChatPage;
