import { NavLink } from "react-router";
import type { User } from "../types";

function MemberProfile({ user, onClose }: { user: User, onClose: () => void }) {
    return (
        <div className="overlay">

            <article className="popUp ">
                <button id="closeButton" onClick={onClose}>✕</button>
                <p className="avatar">{user.name[0].toUpperCase()}</p>
                <h3>name: {user.name}</h3>
                <p>status: {user.status}</p>
                <p>positions: {user.category}</p>
                <div className="popUpButton">
                    <NavLink to={`/chat/${user.id}`}>Send message</NavLink>
                    <NavLink to={`/profile/${user.id}`}>Open profile</NavLink>
                </div>


            </article>
        </div>
    );
}
export default MemberProfile;

