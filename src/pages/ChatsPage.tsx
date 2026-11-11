import { Link } from "react-router";
import { users } from "../data/users";
import { useChatStore } from "../store/chatStore";

export function ChatsPage() {
    const messages = useChatStore((state) => state.messages);

    const chatIds = [...new Set(messages.map(m => m.userId))];

    const chatUsers = users.filter(user => chatIds.includes(user.id));


    return (
        <div className="chats">
            <h2>Chats</h2>
            {!chatUsers.length && <p>No chats yet</p>}
            <ul className="chatsList">
                {chatUsers.map(user => {
                    const lastMessage = messages.filter(m => m.userId === user.id).at(-1);
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
