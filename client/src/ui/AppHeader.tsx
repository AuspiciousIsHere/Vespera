import { LogOut, Sun, UserRound } from "lucide-react";
import { Link } from "react-router";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { useTheme } from "@/context/themeContext";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import ButtonLink from "./ButtonLink";

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
        <Button className="rounded-full size-8" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Sun />
        </Button>

        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <ButtonLink to="/login">Login</ButtonLink>
            <ButtonLink to="/sign-up" variant="outline">
              Sign up
            </ButtonLink>
          </div>
        ) : (
          <>
            <ButtonLink to={`/profile/${user?.usernameSlug}`} variant="outline">
              <UserRound />
              {user?.username}
            </ButtonLink>

            <Button variant="outline" onClick={() => logout()}>
              <LogOut />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
