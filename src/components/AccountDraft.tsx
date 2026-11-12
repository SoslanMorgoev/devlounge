import { useState } from "react";
import { useProfileStore } from "../store/profileStore"
import type { Category } from "../types";

export function AccountDraft({ onClose }: { onClose: () => void }) {
    const profile = useProfileStore((state) => state.profile);
    const setProfile = useProfileStore((state) => state.addToProfile);
    const [inputName, setInputName] = useState(profile.name);
    const [draftStatus, setDraftStatus] = useState(profile.status);
    const [email, setEmail] = useState(profile.email);
    const userName = inputName.trim();
    const isValidEmail = email.includes("@") && email.includes(".") && email.length <= 60;
    const [draftCategory, setDraftCategory] = useState<Category>(profile.category);
    return (
        <div className="accountDraft">
            <ul>
                <p className="avatar">{profile.name[0].toUpperCase()}</p>
                <li>Name: <input value={inputName} placeholder="Enter your new name..." onChange={(e) => setInputName(e.target.value)} /></li>
                <li>Position:  <select value={draftCategory} onChange={(e) => setDraftCategory(e.target.value as Category)}>
                    <option value={"frontend"}>Frontend</option>
                    <option value={"backend"}>Backend</option>
                    <option value={"fullstack"}>Fullstack</option>
                </select></li>
                <li>Status: <label className={draftStatus.length > 50 ? "red" : "none"}>
                    <input value={draftStatus} placeholder="Text about yourself..." onChange={(e) => setDraftStatus(e.target.value)} /> {draftStatus.length}/60
                </label></li>
                <li>Email: <input value={email} placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} /></li>
                <div>
                    <button onClick={() => {
                        if (!isValidEmail) return;
                        if (!inputName.trim() || !draftStatus || draftStatus.length > 60) return;
                        setProfile({ id: crypto.randomUUID(), name: userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(), email: email.trim(), category: draftCategory, status: draftStatus });
                        onClose();
                    }}>Save</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </ul>
            {email && !isValidEmail && <p>Wrong email, try again!</p>}
            {draftStatus.length > 60 && <p>You reached the limit of characters</p>}

        </div>
    )
}