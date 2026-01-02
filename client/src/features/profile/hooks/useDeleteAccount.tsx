import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useAuthStore } from "@/store/authStore";
import { deleteAccount } from "@/api/user";

export default function useDeleteAccount() {
  const zustandLogout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Your Account has been deleted successfully");
      zustandLogout();
      navigate("/");
    },
    onError: (err) => handleError(err),
  });
}
