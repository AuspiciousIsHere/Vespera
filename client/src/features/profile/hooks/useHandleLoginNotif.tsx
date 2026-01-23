import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useAuthStore } from "@/store/authStore";
import { handleLoginNotif } from "@/api/user";

export function useHandleLoginNotif() {
  const { handleError } = useToastErrorHandler();
  const zustandUpdateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: handleLoginNotif,
    onSuccess: (data) => {
      toast.success("Login notification sent successfully!");
      console.log(data);
      zustandUpdateUser(data);
    },
    onError: (err) => handleError(err),
  });
}
