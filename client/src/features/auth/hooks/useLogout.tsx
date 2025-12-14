import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import type { LogoutSuccessResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { logoutUser } from "@/api/auth";

export function useLogout() {
  const navigate = useNavigate();
  const { handleError } = useToastErrorHandler();
  const zustandLogout = useAuthStore((state) => state.logout);

  const { isPending: isLogginOut, mutate: logout } = useMutation<LogoutSuccessResponse, Error, void>({
    mutationKey: ["login-user"],
    mutationFn: logoutUser,
    onSuccess: () => {
      zustandLogout();
      toast.success("Your Logged out successfully");
      navigate("/");
    },
    onError: (err) => handleError(err),
  });

  return { isLogginOut, logout };
}
