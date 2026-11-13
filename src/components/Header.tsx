import { NavLink } from "react-router";

export function Header() {
    return (
        <header className="header">
            <h1>DevLounge</h1>
            <div>
                <nav>
                    <ul className="navigationList">
                        <li><NavLink to="/">Users</NavLink></li>
                        <li><NavLink to="/chats">Chats</NavLink></li>
                        <li><NavLink to="/news">News</NavLink></li>
                        <li><NavLink to="/settings">Settings</NavLink></li>

                    </ul>
                </nav>
            </div>
        </header>
    )
}