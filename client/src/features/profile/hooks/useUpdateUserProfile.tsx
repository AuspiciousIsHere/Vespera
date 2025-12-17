import type { UpdateUserProfileFormInputs, UpdateUserProfileResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "@/api/user";
import { useAuthStore } from "@/store/authStore";
import { useToastErrorHandler } from "@/hooks/useToastErrorHandler";
import { toast } from "react-toastify";

export function useUpdateUserProfile() {
  const zustandUpdateUser = useAuthStore((state) => state.updateUser);
  const { handleError } = useToastErrorHandler();

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation<UpdateUserProfileResponse, Error, UpdateUserProfileFormInputs>({
    mutationKey: ["update-user-profile"],
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      zustandUpdateUser(data);
    },
    onError: (err) => handleError(err),
  });

  return { isUpdatingUser, updateUser };
}
