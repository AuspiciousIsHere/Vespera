import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

// Auth
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { requireAuth } from "@/utils/authCheck";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// Admin
import ManageUsersTable from "./features/admin/ManageUsersTable";

// Design
import DesignDetailsPage from "./features/design/DesignDetailsPage";
import CreateDesignForm from "@/features/design/CreateDesignForm";
import DesignMainPage from "@/features/design/DesignMainPage";
import UserDesigns from "./features/design/UserDesigns";

// Profile
import UserProfile from "@/features/profile/UserProfile";

// Other
import PublicAppLayout from "./ui/PublicAppLayout";
import { useTheme } from "@/context/themeContext";
import PageNotFound from "./ui/PageNotFound";
import EntryPage from "./pages/EntryPage";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicAppLayout />,
    children: [
      { path: "/", element: <EntryPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/sign-up", element: <SignupPage /> },
      { path: "/forget-password", element: <ForgetPasswordPage /> },
      { path: "/reset-password/:token", element: <ResetPasswordPage /> },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    loader: requireAuth,
    children: [
      { path: "/profile/:usernameSlug", element: <UserProfile /> },
      { path: "/design/:id", element: <DesignDetailsPage /> },
      {
        path: "/designs",
        children: [
          { path: ":usernameSlug", element: <UserDesigns /> },
          { path: "", element: <DesignMainPage /> },
        ],
      },
      { path: "/create-design", element: <CreateDesignForm /> },
      { path: "/manage-users", element: <ManageUsersTable /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default function App() {
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer theme={theme === "dark" ? "dark" : "light"} autoClose={2000} />
      <RouterProvider router={router} />
    </>
  );
}
