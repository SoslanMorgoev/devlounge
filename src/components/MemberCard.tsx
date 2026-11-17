import type { User } from "../types";

function MemberCard({ user, onSelect }: { user: User, onSelect: (user: User) => void }) {
    return (
        <>
            <li className="memberCard chat" >
                <p>{user.name}</p>
                <p>{user.status}</p>
                <button onClick={() => onSelect(user)}>Show details</button>
            </li>
        </>
    )
}
export default MemberCard;
