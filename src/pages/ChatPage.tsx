import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { useProfile } from "../hooks/useProfile";
import { useAuthStore } from "../store/authStore";
import { useSendMessage } from "../hooks/useSendMessage";
import { useConversation } from "../hooks/useConversation";
import { useDeleteMessage } from "../hooks/useDeleteMessage";
import { formatTime } from "../utils/formatTime";

function ChatPage() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const sendMessage = useSendMessage();
  const me = useAuthStore((state) => state.user);
  const { data: messages } = useConversation(id);
  const userId = id ?? "";
  const [messageInput, setMessageInput] = useState("");
  const lastMessage = messages?.at(-1);
  const { data: user, isPending, isError } = useProfile(id);
  const deleteMessage = useDeleteMessage();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastMessage?.id]);

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>User not found!</p>;

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
          {messages?.map((message) => (
            <li
              className={message.sender_id === me?.id ? "msgme" : "msgthem"}
              key={message.id}
            >
              {message.sender_id === me?.id ? (
                <div className="messageText">
                  <button
                    className="textButton"
                    onClick={() =>
                      setSelectedId(
                        selectedId === message.id ? null : message.id,
                      )
                    }
                  >
                    {message.text}
                  </button>
                  <span className="messageTime">
                    {formatTime(message.created_at)}
                  </span>
                </div>
              ) : (
                <div className="messageText">
                  <button className="textButton">{message.text}</button>
                  <span className="messageTime">
                    {formatTime(message.created_at)}
                  </span>
                </div>
              )}
              {selectedId === message.id && (
                <div className="deleteMessage">
                  <button
                    onClick={() => {
                      deleteMessage.mutate(message.id);
                      new Audio("/deleteSms.mp3").play();
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={() => setSelectedId(null)}>Cancel</button>
                </div>
              )}
            </li>
          ))}
          <div ref={bottomRef}></div>
        </ul>
      </div>
      <form
        className="conversationForm"
        onSubmit={async (e) => {
          e.preventDefault();
          const text = messageInput.trim();
          if (!text || !me || !id) return;
          sendMessage.mutate(
            {
              sender_id: me.id,
              receiver_id: userId,
              text: messageInput.trim(),
            },
            {
              onSuccess: () => {
                setMessageInput("");
              },
            },
          );
        }}
      >
        <input
          ref={inputRef}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">✉️</button>
      </form>
    </div>
  );
}
export default ChatPage;
