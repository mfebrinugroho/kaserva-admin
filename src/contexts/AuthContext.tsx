import { getUser } from "@/services/authApi";
import type { UserAuth } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { logout as logoutApi } from "@/services/authApi";
import type { StoreAuth } from "@/types/store";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UserAuth | null;
  setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<UserAuth | null>(null);
  const [userStores, setUserStores] = useState<StoreAuth[] | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setUserStores(null);
        setAuthLoading(false);
        return;
      }

      setAuthLoading(true);

      try {
        const user = await getUser();

        setUser(user);
        setUserStores(user.stores);
      } catch (error) {
        console.log(error);
        setUser(null);
        setUserStores(null);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.some((p) => p.slug === permission) ?? false;
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await logoutApi();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");

      setToken(null);

      setUser(null);
      setUserStores(null);

      queryClient.clear();

      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        userStores,
        authLoading,
        hasPermission,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
