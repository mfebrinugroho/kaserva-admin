import LoadingScreen from "@/components/ui/loading/LoadingScreen";
import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/contexts/AuthContext";

type RoleRouteProps = {
  roles: string[];
};

export default function RoleRoute({ roles }: RoleRouteProps) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role.slug)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
