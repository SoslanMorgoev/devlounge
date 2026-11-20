
import { useState } from "react";
import { AccountDraft } from "../components/AccountDraft";
import { useAuthStore } from "../store/authStore";
import { useProfile } from "../hooks/useProfile";
export function AccountPage() {
    const me = useAuthStore((state) => state.user);
    const { data: profile, isPending, isError } = useProfile(me?.id);
    const [isEditing, setIsEditing] = useState(false);
    function handleClose() {
        setIsEditing(false);
    }
    function editProfile() {
        setIsEditing(true);
    }
    if (isPending) return <p>Loading...</p>
    if (isError) return <p>Ops,something went wrong</p>
    return (
        <article className="profileForm">
            <div className="profileInformation">
                <p className="avatar">{profile.name[0].toUpperCase()}</p>
                <ul className="accountInfo">

                    <li>Name: {profile.name}</li>
                    <li>Position: {profile.category}</li>
                    <li>Status: {profile.status}</li>

                </ul>
                <button onClick={editProfile}>Edit</button>
                {isEditing && <AccountDraft profile={profile} onClose={handleClose} />}            </div>
        </article>

    )
}