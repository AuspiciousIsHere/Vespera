import { createBrowserRouter, RouterProvider } from "react-router";

import PublicAppLayout from "./ui/PublicAppLayout";
import PageNotFound from "./ui/PageNotFound";
import EntryPage from "./pages/EntryPage";
import AppLayout from "./ui/AppLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { requireAuth } from "@/utils/authCheck"; // The new loader utility

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
    children: [],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
