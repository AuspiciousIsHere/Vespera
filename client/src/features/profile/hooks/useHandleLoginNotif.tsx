import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { handleLoginNotif } from "@/api/user";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useAuthStore } from "@/store/authStore";

export default function useHandleLoginNotif() {
  const { handleError } = useToastErrorHandler();
  const zustandUpdateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: handleLoginNotif,
    onSuccess: (data) => {
      toast.success("Login notification sent successfully!");
      zustandUpdateUser(data);
    },
    onError: (err) => handleError(err),
  });
}
