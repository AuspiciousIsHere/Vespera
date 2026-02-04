import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useAuthStore } from "@/store/authStore";
import { deleteDesign } from "@/api/design";

export function useDeleteDesign(designID: string) {
  const queryClient = useQueryClient();
  const { handleError } = useToastErrorHandler();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: () => deleteDesign(designID),
    onSuccess: () => {
      toast.success("Design deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["user-designs", user?._id] });
    },
    onError: (err) => handleError(err),
  });
}
