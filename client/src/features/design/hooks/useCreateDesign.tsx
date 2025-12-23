import { createDesign } from "@/api/design";
import { useAuthStore } from "@/store/authStore";
import type { DesignSuccessResponse, DesignFormInput } from "@/types/design";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function useCreateDesign() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const { isPending: isCreatingDesign, mutate: createNewDesign } = useMutation<DesignSuccessResponse, Error, DesignFormInput | FormData>({
    mutationKey: ["create-design"],
    mutationFn: createDesign,
    onSuccess: () => {
      toast.success("Design created successfully!");
      navigate(`/designs/${user?.usernameSlug}`);
    },
    onError: (err) => {
      toast.error("Failed to create design. Please try again.");
      console.error(err);
    },
  });

  return { isCreatingDesign, createNewDesign };
}
