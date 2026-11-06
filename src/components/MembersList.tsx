import type { User, SelectedUser } from "../types";
import MemberCard from "./MemberCard";
import MemberProfile from "./MemberProfile";

function MembersList({ members, selectedUser, onSelect }: { members: User[], selectedUser: SelectedUser, onSelect: (user: SelectedUser) => void }) {
    return (
        <>
            <ul className="membersList" id="membersList">{members.map(user => (
                <MemberCard key={user.id} user={user} onSelect={onSelect} />
            ))}</ul>
            {!members.length && <p>User not found!</p>}
            <p>Online: {members.filter(user => user.online).length}</p>
            {selectedUser && <MemberProfile user={selectedUser} onClose={() => onSelect(null)} />}
        </>
    )
}
export default MembersList;
