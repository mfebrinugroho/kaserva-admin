import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/ui/loading/LoadingScreen";

export default function ProtectedRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
