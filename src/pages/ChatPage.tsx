import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { users } from "../data/users";
import { useChatStore } from "../store/chatStore";

const answers = ["Hello", "Everything is fine,thanks !", "I'm good. How about you ?", "probably", "what?", "Oh...is alright", "How are you file today?"];

function ChatPage() {
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();
    const userId = Number(id);
    const messages = useChatStore((state) => state.messages);
    const addMessage = useChatStore((state) => state.addMessage);
    const [messageInput, setMessageInput] = useState("");
    const conversation = messages.filter(message => message.userId === userId);
    const lastMessage = conversation.at(-1);
    const user = users.find(user => user.id === userId);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lastMessage?.id]);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (lastMessage?.from === "me") {
                const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
                addMessage({ id: crypto.randomUUID(), userId: userId, from: "them", text: randomAnswer });
            }
        }, 2000);
        return () => { clearTimeout(timer) };
    }, [lastMessage?.id]);

    if (!user) return `User not found!`;
    return (
        <div className="conversation">
            <div className="conversationHead">
                <Link to={"/"}>⬅️</Link>
                <span>
                    <p>{user.name}: {user.online ? "online 🟢" : "offline 🔴"}</p>
                </span>


            </div>
            <div className="conversationMain">
                <ul className="chat">
                    {conversation.map((message) =>
                        <li className={message.from === "me" ? "msgme" : "msgthem"} key={message.id}>{message.text}</li>

                    )}
                    <div ref={bottomRef}></div>
                </ul>
            </div>
            <form className="conversationForm" onSubmit={(e) => {
                e.preventDefault();
                if (!messageInput.trim()) return; addMessage({ id: crypto.randomUUID(), userId: userId, from: "me", text: messageInput.trim() }); setMessageInput("")
            }}>
                <input ref={inputRef} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <button type="submit">✉️</button>
            </form>

        </div>
    )
}
export default ChatPage;
