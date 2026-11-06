import { BrowserRouter, Route, Routes } from "react-router";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <h1>DevLounge</h1>

      <Routes>
        <Route path="/" element={<MembersPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
