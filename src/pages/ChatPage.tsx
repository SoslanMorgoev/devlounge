import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { users } from "../data/users";
import { useChatStore } from "../store/chatStore";

const answers = ["Hello", "Everything is file,thanks ?", "How about you ?", "probably", "what?", "Oh...is alright", "How are you filing today?"];

function ChatPage() {
    const { id } = useParams();
    const userId = Number(id);
    const messages = useChatStore((state) => state.messages);
    const addMessage = useChatStore((state) => state.addMessage);
    const [messageInput, setMessageInput] = useState("");
    const conversation = messages.filter(message => message.userId === userId);
    const lastMessage = conversation.at(-1);
    const userName = users.find(user => user.id === userId)?.name;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lastMessage?.from === "me") {
                const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
                addMessage({ id: crypto.randomUUID(), userId: userId, from: "them", text: randomAnswer });
            }
        }, 2000);
        return () => { clearTimeout(timer) };
    }, [lastMessage?.id]);

    if (!userName) return `User not found!`;
    return (
        <>
            <Link to={"/"}>⬅️</Link>
            <ul className="chat">
                {conversation.map((message) =>
                    <li className={message.from === "me" ? "msgme" : "msgthem"} key={message.id}>{message.text}</li>
                )}
            </ul>
            <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
            <button onClick={() => { if (!messageInput.trim()) return; addMessage({ id: crypto.randomUUID(), userId: userId, from: "me", text: messageInput.trim() }); setMessageInput("") }}>Send</button>
        </>
    )
}
export default ChatPage;
