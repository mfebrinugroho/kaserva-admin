import { Navigate, Outlet } from "react-router";
import LoadingScreen from "@/components/ui/loading/LoadingScreen";

import { useAuth } from "@/contexts/AuthContext";

export default function GuestRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
