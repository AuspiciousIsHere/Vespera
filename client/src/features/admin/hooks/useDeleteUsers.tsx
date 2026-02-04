import { deleteUsers } from "@/api/user";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteUsers() {
  const queryClient = useQueryClient();
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      toast.success("Users deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (err) => handleError(err),
  });
}
