import { Link } from "react-router";
import type { User } from "../types";

function MemberProfile({ user, onClose }: { user: User, onClose: () => void }) {
    return (
        <div className="overlay">
            <div className="popUp">
                <h3>name: {user.name}</h3>
                <p>age: {user.age}</p>
                <p>positions: {user.category}</p>
                <p>status: {user.online ? "online" : "offline"}</p>
                <Link to={`/profile/${user.id}`}>read more...</Link>
                <Link to={`/chat/${user.id}`}>Send message</Link>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default MemberProfile;

