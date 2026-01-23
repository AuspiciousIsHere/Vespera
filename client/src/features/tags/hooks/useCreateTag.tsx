import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTag } from "@/api/tag";
import { useToastErrorHandler } from "../../../hooks/useToastErrorHandler";

export function useCreateTag(userID: string | undefined) {
  const queryClient = useQueryClient();
  const { handleError } = useToastErrorHandler();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      toast.success("Tag created successfully");
      queryClient.invalidateQueries({ queryKey: ["user-tags", userID] });
    },
    onError: (err) => handleError(err),
  });
}
