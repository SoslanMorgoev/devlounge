import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

export function RequireAuth({ children }: { children: ReactNode }) {
    const me = useAuthStore((state) => state.user);
    const authLoading = useAuthStore((state) => state.authLoading);

    if (authLoading) return <p>Loading...</p>;
    if (!me) return <Navigate to="/login" replace />;

    return children;
}
