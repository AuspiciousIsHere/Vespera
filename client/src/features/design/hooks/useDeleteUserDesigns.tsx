import { deleteDesigns } from "@/api/design";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteUserDesigns(userID: string) {
  const queryClient = useQueryClient();
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: deleteDesigns,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-designs", userID] });
      toast.success("Designs deleted successfully");
    },
    onError: (err) => handleError(err),
  });
}
