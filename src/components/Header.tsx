import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { useNotificationStore } from "../store/notificationStore";

export function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const unread = useNotificationStore((state) => state.unread);
  
  return (
    <header className="header">
      <h1>DevLounge</h1>
      <div>
        <nav>
          <ul className="navigationList">
            <li>
              <NavLink to="/">👤Users</NavLink>
            </li>
            <li>
              <NavLink to="/chats">
                💬Chats{unread > 0 && <span className="badge">{unread}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/news">📰News</NavLink>
            </li>
            <li>
              <NavLink to="/settings">⚙️Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {user ? (
        <div className="logout">
          <NavLink to="/settings/account">{user.email}</NavLink>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/login");
            }}
          >
            LogOut
          </button>
        </div>
      ) : (
        <NavLink to="/login">LogIn</NavLink>
      )}
    </header>
  );
}
