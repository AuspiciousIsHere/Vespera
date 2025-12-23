import { LogOut, Sun, UserRound } from "lucide-react";
import { Link } from "react-router";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { useTheme } from "@/context/themeContext";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function AppHeader({ showVespera = false }) {
  const { isAuthenticated, user } = useAuthStore((state) => state);
  const { setTheme, theme } = useTheme();
  const { logout } = useLogout();

  return (
    <div className="border-b-2 bg-background h-14 w-full flex items-center px-4">
      {showVespera && (
        <Link to="/">
          <h2 className="font-extrabold text-2xl">Vespera</h2>
        </Link>
      )}

      <div className="flex items-center gap-5 ml-auto">
        <Button className="rounded-full w-10 h-10" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Sun />
        </Button>

        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline">
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        ) : (
          <>
            <Link to={`/profile/${user?.usernameSlug}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                <UserRound />
                {user?.username}
              </Button>
            </Link>

            <Button variant="outline" onClick={() => logout()}>
              <LogOut />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
