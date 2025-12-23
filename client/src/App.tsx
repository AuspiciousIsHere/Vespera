import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

// Auth
import { requireAuth } from "@/utils/authCheck";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Admin
import ManageUsers from "./features/admin/ManageUsers";

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
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <Signup /> },
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
          { path: "/", element: <DesignMainPage /> },
        ],
      },
      { path: "/create-design", element: <CreateDesignForm /> },
      { path: "/manage-users", element: <ManageUsers /> },
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
