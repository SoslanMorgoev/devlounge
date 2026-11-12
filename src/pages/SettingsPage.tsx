import { useState } from "react"
import { useProfileStore } from "../store/profileStore";
import type { Category } from "../types";
export function SettingsPage() {
    const [inputName, setInputName] = useState("");
    const [draftStatus, setDraftStatus] = useState("");
    const [draftCategory, setDraftCategory] = useState<Category>("frontend");
    const setProfile = useProfileStore((state) => state.addToProfile);
    const profile = useProfileStore((state) => state.profile);


    return (
        <article className="profileForm">
            <div className="draftForProfile">
                <label>
                    <input value={inputName} placeholder="Enter your new name..." onChange={(e) => setInputName(e.target.value)} />
                </label>

                <label className={draftStatus.length > 50 ? "red" : "none"}>
                    <input value={draftStatus} placeholder="Text about yourself..." onChange={(e) => setDraftStatus(e.target.value)} /> {draftStatus.length}/60
                </label>

                <select value={draftCategory} onChange={(e) => setDraftCategory(e.target.value as Category)}>
                    <option value={"frontend"}>Frontend</option>
                    <option value={"backend"}>Backend</option>
                    <option value={"fullstack"}>Fullstack</option>
                </select>
                <button onClick={() => {
                    if (!inputName.trim() || !draftStatus || draftStatus.length > 60) return;
                    setProfile({ id: crypto.randomUUID(), name: inputName.trim().charAt(0).toUpperCase() + inputName.slice(1).toLowerCase(), category: draftCategory, status: draftStatus });
                    setInputName("");
                    setDraftStatus("");
                }}>Save</button>
            </div>

            {draftStatus.length > 60 && <p>You rich the limit of characters</p>}
            {profile.name.length > 0 && <div className="profileInformation">

                <ul>
                    <li>Name: {profile.name}</li>
                    <li>Position: {profile.category}</li>
                    <li>Status: {profile.status}</li>
                </ul>
            </div>}
        </article>
    )
}