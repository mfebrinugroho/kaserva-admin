import { useAuth } from "@/contexts/AuthContext";

export const useRole = () => {
  const { user } = useAuth();

  const role = user?.role?.slug;

  const isSuperAdmin = role === "super-admin";
  const isOwner = role === "owner";
  const isAdmin = role === "admin";
  const isCashier = role === "cashier";

  const hasRole = (roleName: string) => role === roleName;

  const hasAnyRole = (roles: string[]) => roles.includes(role ?? "");

  return {
    role,
    isSuperAdmin,
    isOwner,
    isAdmin,
    isCashier,
    hasRole,
    hasAnyRole,
  };
};
