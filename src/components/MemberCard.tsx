import type { User } from "../types";

function MemberCard({ user, onSelect }: { user: User, onSelect: (user: User) => void }) {
    return (
        <>
            <ul className="MemberCard" >
                <li>{user.name}</li>
                <li>{user.online ? "online" : "offline"}</li>
                <button onClick={() => onSelect(user)}>Show details</button>
            </ul>
        </>
    )
}
export default MemberCard;
