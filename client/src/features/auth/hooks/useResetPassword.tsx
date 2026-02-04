import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useAuthStore } from "@/store/authStore";
import { resetPassword } from "@/api/auth";

export function useResetPassword() {
  const navigate = useNavigate();
  const zustandLogin = useAuthStore((state) => state.login);
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success("Password Reset Successfully");
      zustandLogin(data);
      navigate("/");
    },
    onError: (err) => handleError(err),
  });
}
