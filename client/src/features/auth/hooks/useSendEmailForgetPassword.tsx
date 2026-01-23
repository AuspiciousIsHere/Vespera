import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { sendEmailForgetPassword } from "@/api/auth";

export function useSendEmailForgetPassword() {
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: sendEmailForgetPassword,
    onSuccess: () => toast.success("An email successfully sent to your email address"),
    onError: (err) => handleError(err),
  });
}
