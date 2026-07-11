import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

type RoleRouteProps = {
  roles: string[];
};

export default function RoleRoute({ roles }: RoleRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role.slug)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

// type Props = {
//   roles: string[];
//   children: React.ReactNode;
// };

// export default function RoleRoute({ roles, children }: Props) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!roles.includes(user.role.slug)) {
//     return <Navigate to="/403" replace />;
//   }

//   return <>{children}</>;
// }
