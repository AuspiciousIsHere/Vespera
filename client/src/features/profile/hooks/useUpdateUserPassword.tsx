import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useAuthStore } from "@/store/authStore";
import { updateUserPassword } from "@/api/auth";

export function useUpdateUserPassword() {
  const { handleError } = useToastErrorHandler();
  const zustandLogin = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      zustandLogin(data);
      toast.success("Your password updated successfully");
    },
    onError: (err) => handleError(err),
  });
}
