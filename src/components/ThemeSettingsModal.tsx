export function ThemeSettingsModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="overlay">
            <div className="popUp">
                <p>auto answer</p>
                <p>clean all chats</p>
                <div>
                    <button onClick={onClose}>Save and close</button>
                </div>
            </div>

        </div>

    )
}