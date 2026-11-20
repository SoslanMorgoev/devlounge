import { NavLink } from "react-router";
import { useState } from "react";
import { NewsSettingsModal } from "../components/NewsSettingsModal";
// import { ThemeSettingsModal } from "../components/ThemeSettingsModal";

export function SettingsPage() {
    const [openModal, setOpenModal] = useState<"news" | null>(null);
    function handleClose() {
        setOpenModal(null);
    }


    return (
        <div className="settingNavigation">
            <NavLink to={`/settings/account`}>Account</NavLink>
            <button onClick={() => setOpenModal("news")}>News</button>
            {openModal === "news" && <NewsSettingsModal onClose={handleClose} />}
            {/* <button onClick={() => setOpenModal("theme")}>Theme</button>
            {openModal === "theme" && <ThemeSettingsModal onClose={handleClose} />} */}
        </div>
    )
}