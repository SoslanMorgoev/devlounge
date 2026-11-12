import { NavLink } from "react-router";

export function SettingsPage() {

    return (
        <div className="settingNavigation">
            <NavLink to={`/settings/account`}>Account</NavLink>
            <NavLink to={`/settings/chatsSetting`}>Chats</NavLink>
            <NavLink to={`/settings/news`}>News</NavLink>
            <NavLink to={`/settings/theme`}>Theme</NavLink>
        </div>
    )
}