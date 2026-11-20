import { Link, useParams } from "react-router";
import { useProfile } from "../hooks/useProfile";

function ProfilePage() {
    const { id } = useParams();
    const { data: user, isPending, isError } = useProfile(id);

    if (isPending) return <p>Loading...</p>
    if (isError) return (<div>
        <p>User not found</p>
        <Link to={"/"}>Back</Link>
    </div>);
    return (
        <div className="profile">
            <ul className="profileInfo">
                <li>Name: {user.name}</li>
                <li>category: {user.category}</li>
                <li>status: {user.status}</li>

            </ul>
            <div className="userProfileButtons">
                <Link to={`/chat/${user.id}`}>Send message</Link>
                <Link to={"/"}>Back</Link>
            </div>

        </div>
    )
}
export default ProfilePage;
