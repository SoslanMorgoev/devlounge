
import { useProfileStore } from "../store/profileStore";
import { useState } from "react";
import { AccountDraft } from "../components/AccountDraft";
export function AccountPage() {
    const profile = useProfileStore((state) => state.profile);
    const [isEditing, setIsEditing] = useState(false);
    function handleClose() {
        setIsEditing(false);
    }
    function editProfile() {
        setIsEditing(true);
    }
    return (
        <article className="profileForm">
            {profile.name.length > 0 && <div className="profileInformation">

                <ul className="accountInfo">
                    <p className="avatar">{profile.name[0].toUpperCase()}</p>
                    <li>Name: {profile.name}</li>
                    <li>Position: {profile.category}</li>
                    <li>Status: {profile.status}</li>
                    <li>Email: {profile.email}</li>
                    <button onClick={editProfile}>Edit</button>
                    {!profile && <p>Profile not founded</p>}
                    {isEditing && <AccountDraft onClose={handleClose} />}
                </ul>
            </div>}
        </article>

    )
}