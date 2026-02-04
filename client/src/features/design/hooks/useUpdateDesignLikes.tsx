import { updateDesignLikes } from "@/api/design";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateDesignLikes(designID: string) {
  const { handleError } = useToastErrorHandler();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDesignLikes,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["design", designID] }),
    onError: (err) => handleError(err),
  });
}
