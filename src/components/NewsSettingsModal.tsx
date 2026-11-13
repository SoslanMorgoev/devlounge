export function NewsSettingsModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="overlay">
            <div className="popUp">
                <p>show news</p>
                <p>clean all chats</p>
                <div>
                    <button onClick={onClose}>Save and close</button>
                </div>
            </div>

        </div>

    )
}