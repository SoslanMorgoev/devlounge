import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export function RequireAuth({ children }: { children: ReactNode }) {
    const me = useAuthStore((state) => state.user);                  // из ChatsPage
    const authLoading = useAuthStore((state) => state.authLoading);  // из ChatsPage

    if (authLoading) return <p>Loading...</p>;                       // из ChatsPage
    if (!me) return <Navigate to="/login" replace />;                // из ChatsPage

    return children;                                                 // новое
}
