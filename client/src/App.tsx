import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

import PublicAppLayout from "./ui/PublicAppLayout";
import PageNotFound from "./ui/PageNotFound";
import EntryPage from "./pages/EntryPage";
import AppLayout from "./ui/AppLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import CreateDesignForm from "@/features/design/CreateDesignForm";
import DesignMainPage from "@/features/design/DesignMainPage";
import UserProfile from "@/features/profile/UserProfile";
import { useTheme } from "@/context/themeContext";
import { requireAuth } from "@/utils/authCheck";
import UserDesigns from "./features/design/UserDesigns";

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
      { path: "/design/:usernameSlug", element: <UserDesigns /> },
      { path: "/designs", element: <DesignMainPage /> },
      { path: "/create-design", element: <CreateDesignForm /> },
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
