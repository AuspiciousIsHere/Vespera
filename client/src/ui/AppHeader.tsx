import { LogOut } from "lucide-react";
import { Link } from "react-router";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout } = useLogout();

  return (
    <div className="border-b-2 border-neutral-100 bg-background h-14 w-full flex items-center px-4">
      <Link to="/">
        <h2 className="font-extrabold text-2xl">Vespera</h2>
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        {!isAuthenticated ? (
          <>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline">
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </>
        ) : (
          <>
            {/* <Link to="#">
              <div className="flex items-center gap-2 bg-neutral-200">
                <UserRound />
                <p>user</p>
              </div>
            </Link> */}

            <Button variant="outline" onClick={() => logout()}>
              <LogOut />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
