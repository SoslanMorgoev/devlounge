import { BrowserRouter, Route, Routes } from "react-router";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { Header } from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MembersPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;
