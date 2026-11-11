import { Link, useParams } from "react-router";
import { users } from "../data/users";

function ProfilePage() {
    const { id } = useParams();
    const user = users.find(i => i.id === Number(id));
    if (!user) {
        return <div>
            <p>User not found</p>
            <Link to={"/"}>Back</Link>
        </div>
    }
    return (
        <div>
            <ul className="profile chat">
                <li>Name: {user.name}</li>
                <li>Age: {user.age}</li>
                <li>Position: {user.category}</li>
                <li>Status: {user.online ? "online" : "offline"}</li>
                <li><Link to={`/chat/${user.id}`}>Send message</Link></li>
            </ul>
            <Link to={"/"}>Back</Link>
        </div>
    )
}
export default ProfilePage;
