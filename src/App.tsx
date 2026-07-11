import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/ui/loading/LoadingScreen";
import GuestRoute from "@/routes/GuestRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Menu from "@/pages/Menu";
import RoleRoute from "@/routes/RoleRoute";
import Forbidden from "@/pages/ErrorPage/Forbidden";
import NotFound from "@/pages/ErrorPage/NotFound";
import UserPage from "@/pages/Users/UserPage";
import CreateUserPage from "@/pages/Users/CreateUserPage";
import { PATH } from "@/routes/path";
import { Toaster } from "sonner";
import EditUserPage from "@/pages/Users/EditUserPage";
import StorePage from "@/pages/Stores/StorePage";
import CreateStorePage from "./pages/Stores/CreateStorePage";
import EditStorePage from "./pages/Stores/EditStorePage";

function App() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <Router>
        <ScrollToTop />
        <Routes>
          {/* User Login */}
          <Route element={<ProtectedRoute />}>
            <Route path={PATH.FORBIDDEN} element={<Forbidden />} />

            <Route element={<AppLayout />}>
              <Route index path={PATH.DASHBOARD} element={<Dashboard />} />

              {/* Super Admin */}
              <Route element={<RoleRoute roles={["super-admin"]} />}>
                <Route path={PATH.USERS} element={<UserPage />} />
                <Route path={PATH.USERS_CREATE} element={<CreateUserPage />} />
                <Route
                  path={PATH.USERS_EDIT_PATTERN}
                  element={<EditUserPage />}
                />

                <Route
                  path={PATH.STORES_CREATE}
                  element={<CreateStorePage />}
                />
              </Route>

              {/* Super Admin & Owner */}
              <Route element={<RoleRoute roles={["super-admin", "owner"]} />}>
                <Route path={PATH.STORES} element={<StorePage />} />
                <Route
                  path={PATH.STORES_EDIT_PATTERN}
                  element={<EditStorePage />}
                />
              </Route>

              {/* Admin */}
              <Route element={<RoleRoute roles={["admin"]} />}>
                <Route path={PATH.MENU} element={<Menu />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Guest */}
          <Route element={<GuestRoute />}>
            <Route
              path={PATH.LOGIN}
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
