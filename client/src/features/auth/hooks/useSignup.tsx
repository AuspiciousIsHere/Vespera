import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import type { SignupSuccessResponse, SingupFormInputs } from "@/types/auth";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { singupUser } from "@/api/auth";

export function useSignup() {
  const navigate = useNavigate();
  const { handleError } = useToastErrorHandler();

  const { isPending: isSigningUp, mutate: signup } = useMutation<SignupSuccessResponse, Error, SingupFormInputs>({
    mutationKey: ["login-user"],
    mutationFn: singupUser,
    onSuccess: () => {
      toast.success("Your account created successfully");
      navigate("/");
    },
    onError: (err) => handleError(err),
  });

  return { isSigningUp, signup };
}
