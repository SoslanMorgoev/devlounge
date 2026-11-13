import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useSettingStore } from "../store/settingStore"


export function ChatSettingsModal({ onClose }: { onClose: () => void }) {
    const autoReply = useSettingStore((state) => state.autoReply);
    const onChange = useSettingStore((state) => state.setAutoReply);
    const clearAll = useChatStore((state) => state.clearAll);
    const [clear, setClear] = useState(false);
    return (
        <div className="overlay">
            <div className="popUp">
                <div className="chatSetting">
                    <label>
                        <input type="checkbox" role="switch" className="switch" checked={autoReply} onChange={(e) => onChange(e.target.checked)} />
                        Auto reply
                    </label>
                    <div>
                        Clear All chat  <button onClick={() => setClear(true)}>Clear</button>
                    </div>
                    {clear &&
                        <div className="deleteConfirm">
                            <h3>Clean all chat ,you sure?</h3>
                            <div className="deleteChatButtons">
                                <button onClick={() => { clearAll(); setClear(false) }}>Yes</button>
                                <button onClick={() => setClear(false)}>No</button>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>

        </div>

    )
}