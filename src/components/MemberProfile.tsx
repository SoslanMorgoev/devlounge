import { NavLink } from "react-router";
import type { User } from "../types";

function MemberProfile({ user, onClose }: { user: User, onClose: () => void }) {
    return (
        <div className="overlay">
            <div className="popUp ">
                <h3>name: {user.name}</h3>
                <p>age: {user.age}</p>
                <p>positions: {user.category}</p>
                <p>status: {user.online ? "online" : "offline"}</p>
                <NavLink to={`/profile/${user.id}`}>read more...</NavLink>
                <NavLink to={`/chat/${user.id}`}>Send message</NavLink>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default MemberProfile;

