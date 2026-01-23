import { deleteDesigns } from "@/api/design";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteDesigns() {
  const queryClient = useQueryClient();
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: deleteDesigns,
    onSuccess: () => {
      toast.success("Designs deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-designs"] });
    },
    onError: (err) => handleError(err),
  });
}
