import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { users } from "../data/users";
import { useChatStore } from "../store/chatStore";

const answers = ["Hello", "Everything is file,thanks !", "I'm good. How about you ?", "probably", "what?", "Oh...is alright", "How are you filing today?"];

function ChatPage() {
    const { id } = useParams();
    const userId = Number(id);
    const messages = useChatStore((state) => state.messages);
    const addMessage = useChatStore((state) => state.addMessage);
    const [messageInput, setMessageInput] = useState("");
    const conversation = messages.filter(message => message.userId === userId);
    const lastMessage = conversation.at(-1);
    const user = users.find(user => user.id === userId);

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
                </ul>
            </div>
            <form className="conversationForm" onSubmit={(e) => {
                e.preventDefault();
                if (!messageInput.trim()) return; addMessage({ id: crypto.randomUUID(), userId: userId, from: "me", text: messageInput.trim() }); setMessageInput("")
            }}>
                <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <button type="submit">✉️</button>
            </form>

        </div>
    )
}
export default ChatPage;
