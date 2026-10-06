import { createContext, useContext } from "react";
import { useLogoutMutation } from "@/hooks/mutations/useLogoutMutation";
import { useMe } from "@/hooks/useMe";
import type { MeResponse } from "@/types/auth";
import type { StoreAuth } from "@/types/store";

type AuthContextType = {
  user: MeResponse | null;
  userStores: StoreAuth[] | null;
  authLoading: boolean;
  hasPermission: (permission: string) => boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading: isMeLoading } = useMe();

  const userStores = user?.stores ?? [];

  const hasPermission = (permission: string) => {
    return user?.permissions?.some((p) => p.slug === permission) ?? false;
  };

  const logoutMutation = useLogoutMutation();

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        userStores,
        authLoading: isMeLoading,
        hasPermission,
        logout: logoutMutation.mutateAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
