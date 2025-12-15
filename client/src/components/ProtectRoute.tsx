import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/authStore";

interface ProtectRouteProps {
  redirectPath?: string;
}

export default function ProtectRoute({ redirectPath = "/login" }: ProtectRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
