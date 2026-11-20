import { useState } from "react";
import type { Category, User } from "../types";
import { supabase } from "../lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export function AccountDraft({ profile, onClose }: { profile: User, onClose: () => void }) {
    const queryClient = useQueryClient();

    const [inputName, setInputName] = useState(profile.name);
    const [draftStatus, setDraftStatus] = useState(profile.status);
    const userName = inputName.trim();
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

                <div>
                    <button onClick={async () => {

                        const { error } = await supabase
                            .from("profiles")
                            .update({ name: userName, category: draftCategory, status: draftStatus })
                            .eq("id", profile.id);
                        if (error) {
                            console.log(error.message);
                            return;
                        }
                        queryClient.invalidateQueries({ queryKey: ["profiles"] });
                        onClose();

                    }}>Save</button>

                </div>
            </ul>
            {draftStatus.length > 60 && <p>You reached the limit of characters</p>}

        </div>
    )
}