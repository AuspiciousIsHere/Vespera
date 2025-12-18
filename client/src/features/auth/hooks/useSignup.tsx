import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import type { SignupSuccessResponse, SingupFormInputs } from "@/types/auth";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { singupUser } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

export function useSignup() {
  const navigate = useNavigate();
  const { handleError } = useToastErrorHandler();
  const zustandSingup = useAuthStore((state) => state.singup);

  const { isPending: isSigningUp, mutate: signup } = useMutation<SignupSuccessResponse, Error, SingupFormInputs>({
    mutationKey: ["login-user"],
    mutationFn: singupUser,
    onSuccess: (data) => {
      toast.success("Your account created successfully");
      zustandSingup(data);
      navigate("/");
    },
    onError: (err) => handleError(err),
  });

  return { isSigningUp, signup };
}
