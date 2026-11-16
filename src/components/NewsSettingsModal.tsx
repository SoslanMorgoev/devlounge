import { useState } from "react";
import { useSettingStore } from "../store/settingStore"

export function NewsSettingsModal({ onClose }: { onClose: () => void }) {
    const newsTag = useSettingStore((state) => state.newsTag);
    const onChange = useSettingStore((state) => state.setNewsTag);
    const [draftInput, setDraftInput] = useState(newsTag);

    return (
        <div className="overlay">
            <div className="popUp">
                <label >
                    Tag for your news! <input value={draftInput} onChange={(e) => setDraftInput(e.target.value)} />

                </label>
                {newsTag.length > 0 && <button onClick={() => { onChange(""); setDraftInput("") }}>Clean initial tags</button>}
                <div className="modalButtons">
                    <button onClick={() => { onChange(draftInput.trim()); onClose() }}>Save and close</button>
                    <button onClick={onClose}>Close</button>
                </div>

            </div>
        </div>

    )
}