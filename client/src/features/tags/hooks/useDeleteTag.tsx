import { deleteTag } from "@/api/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteTag(userID: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      toast.success("Tag deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["user-tags", userID] });
    },
  });
}
