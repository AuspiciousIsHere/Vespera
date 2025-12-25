import type { UpdateUserProfileFormInputs, UpdateUserProfileResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { updateUserProfile } from "@/api/user";
import { useAuthStore } from "@/store/authStore";

export function useUpdateUserProfile() {
  const zustandUpdateUser = useAuthStore((state) => state.updateUser);
  const { handleError } = useToastErrorHandler();

  return useMutation<UpdateUserProfileResponse, Error, UpdateUserProfileFormInputs | FormData>({
    mutationKey: ["update-user-profile"],
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      zustandUpdateUser(data);
    },
    onError: (err) => handleError(err),
  });
}
