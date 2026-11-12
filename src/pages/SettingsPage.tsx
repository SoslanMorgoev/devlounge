import { useState } from "react"
import { useProfileStore } from "../store/profileStore";
import type { Category } from "../types";
export function SettingsPage() {
    const setProfile = useProfileStore((state) => state.addToProfile);
    const profile = useProfileStore((state) => state.profile);
    const [inputName, setInputName] = useState(profile.name);
    const [draftStatus, setDraftStatus] = useState(profile.status);
    const [draftCategory, setDraftCategory] = useState<Category>(profile.category);
    const [email, setEmail] = useState(profile.email);
    const userName = inputName.trim();
    const isValidEmail = email.includes("@") && email.includes(".") && email.length <= 60;

    return (
        <article className="profileForm">
            <div className="draftForProfile">
                <label>
                    <input value={inputName} placeholder="Enter your new name..." onChange={(e) => setInputName(e.target.value)} />
                </label>
                <input value={email} placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} />
                <label className={draftStatus.length > 50 ? "red" : "none"}>
                    <input value={draftStatus} placeholder="Text about yourself..." onChange={(e) => setDraftStatus(e.target.value)} /> {draftStatus.length}/60
                </label>

                <select value={draftCategory} onChange={(e) => setDraftCategory(e.target.value as Category)}>
                    <option value={"frontend"}>Frontend</option>
                    <option value={"backend"}>Backend</option>
                    <option value={"fullstack"}>Fullstack</option>
                </select>
                <button onClick={() => {
                    if (!isValidEmail) return;
                    if (!inputName.trim() || !draftStatus || draftStatus.length > 60) return;
                    setProfile({ id: crypto.randomUUID(), name: userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(), email: email.trim(), category: draftCategory, status: draftStatus });
                }}>Save</button>
            </div>
            {!isValidEmail && <p>Wrong email, try again!</p>}
            {draftStatus.length > 60 && <p>You rich the limit of characters</p>}
            {profile.name.length > 0 && <div className="profileInformation">

                <ul>
                    <li>Name: {profile.name}</li>
                    <li>Position: {profile.category}</li>
                    <li>Status: {profile.status}</li>
                    <li>Email: {profile.email}</li>
                </ul>
            </div>}
        </article>
    )
}