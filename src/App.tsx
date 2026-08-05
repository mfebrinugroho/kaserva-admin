import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import { ScrollToTop } from "@/components/common/ScrollToTop";
// import AppLayout from "@/layouts/AppLayout";
// import Dashboard from "@/pages/Dashboard";
// import Login from "@/pages/Login";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/ui/loading/LoadingScreen";
import GuestRoute from "@/routes/GuestRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleRoute from "@/routes/RoleRoute";
// import Forbidden from "@/pages/ErrorPage/Forbidden";
// import NotFound from "@/pages/ErrorPage/NotFound";
// import UserPage from "@/pages/Users/UserPage";
// import CreateUserPage from "@/pages/Users/CreateUserPage";
import { PATH } from "@/routes/path";
import { Toaster } from "sonner";
// import EditUserPage from "@/pages/Users/EditUserPage";
// import StorePage from "@/pages/Stores/StorePage";
// import CreateStorePage from "./pages/Stores/CreateStorePage";
// import EditStorePage from "./pages/Stores/EditStorePage";
// import MenuPage from "./pages/Menus/MenuPage";
// import CreateMenuPage from "./pages/Menus/CreateMenuPage";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AppLayout = lazy(() => import("@/layouts/AppLayout"));
const Login = lazy(() => import("@/pages/Login"));
const UserPage = lazy(() => import("@/pages/Users/UserPage"));
const CreateUserPage = lazy(() => import("@/pages/Users/CreateUserPage"));
const EditUserPage = lazy(() => import("@/pages/Users/EditUserPage"));
const StorePage = lazy(() => import("@/pages/Stores/StorePage"));
const CreateStorePage = lazy(() => import("@/pages/Stores/CreateStorePage"));
const EditStorePage = lazy(() => import("@/pages/Stores/EditStorePage"));
const MenuPage = lazy(() => import("@/pages/Menus/MenuPage"));
const CreateMenuPage = lazy(() => import("@/pages/Menus/CreateMenuPage"));
const Forbidden = lazy(() => import("@/pages/ErrorPage/Forbidden"));
const NotFound = lazy(() => import("@/pages/ErrorPage/NotFound"));

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

                <Route path={PATH.MENUS} element={<MenuPage />} />
                <Route path={PATH.MENUS_CREATE} element={<CreateMenuPage />} />
              </Route>
              {/* End Super Admin */}

              {/* Super Admin & Owner */}
              <Route element={<RoleRoute roles={["super-admin", "owner"]} />}>
                <Route path={PATH.STORES} element={<StorePage />} />
                <Route
                  path={PATH.STORES_EDIT_PATTERN}
                  element={<EditStorePage />}
                />
              </Route>

              {/* Admin */}
              <Route element={<RoleRoute roles={["admin"]} />}></Route>
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
