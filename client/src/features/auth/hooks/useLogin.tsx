import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import type { LoginFormInputs, LoginSuccessResponse } from "@/types/auth";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { loginUser } from "@/api/auth";

export function useLogin() {
  const navigate = useNavigate();
  const { handleError } = useToastErrorHandler();
  const zustandLogin = useAuthStore((state) => state.login);

  const { isPending: isLoggingIn, mutate: login } = useMutation<LoginSuccessResponse, Error, LoginFormInputs>({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successfull");
      zustandLogin(data);
      navigate("/");
    },
    onError: (err) => handleError(err),
  });

  return { isLoggingIn, login };
}
