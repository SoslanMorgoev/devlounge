import { BrowserRouter, Route, Routes } from "react-router";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { Header } from "./components/Header";
import { ChatsPage } from "./pages/ChatsPage";
import { AccountPage } from "./pages/AccountPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NewsPage } from "./pages/NewsPage";
import { LogInPage } from "./pages/LoginPage";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useAuthStore } from "./store/authStore";
import { RequireAuth } from "./components/RequireAuth";
import { useQueryClient } from "@tanstack/react-query";



function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

    });
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const channel = supabase
      .channel("messages-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<RequireAuth><MembersPage /></RequireAuth>} />
          <Route path="/profile/:id" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/chat/:id" element={<RequireAuth><ChatPage /></RequireAuth>} />
          <Route path="/chats" element={<RequireAuth><ChatsPage /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
          <Route path="/settings/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
          <Route path="/login" element={<LogInPage />} />

        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;
