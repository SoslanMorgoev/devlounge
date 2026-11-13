import { BrowserRouter, Route, Routes } from "react-router";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { Header } from "./components/Header";
import { ChatsPage } from "./pages/ChatsPage";
import { AccountPage } from "./pages/AccountPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NewsPage } from "./pages/NewsPage";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MembersPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/account" element={<AccountPage />} />

        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;
