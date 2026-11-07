import { Link } from "react-router";
import { users } from "../data/users";
import { useChatStore } from "../store/chatStore";

export function ChatsPage() {
    const messages = useChatStore((state) => state.messages);

    const chatIds = [...new Set(messages.map(m => m.userId))];

    const chatUsers = users.filter(user => chatIds.includes(user.id));

    console.log("chto tam za chat", chatUsers);
    return (
        <div>
            <h2>Chats</h2>
            {!chatUsers.length && <p>No chats yet</p>}
            <ul>
                {chatUsers.map(user => {
                    const lastMessage = messages.filter(m => m.userId === user.id).at(-1);
                    return (
                        <li key={user.id}>
                            <Link to={`/chat/${user.id}`}>{user.name} — {lastMessage?.text}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
