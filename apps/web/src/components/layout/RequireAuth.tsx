import {Navigate, Outlet, useLocation} from "react-router";
import {useAuthStore} from "@/stores/auth";

export function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const location = useLocation();

  // CRITICAL: Wait while we verify the session
  if (isInitializing) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated) {
    // Save the attempted URL to redirect back after login
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return <Outlet />;
}
