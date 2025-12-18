import type { UpdateUserProfileFormInputs, UpdateUserProfileResponse } from "@/types/user";
import { apiClient } from "@/utils/apiClient";

export const updateUserProfile = async (data: UpdateUserProfileFormInputs): Promise<UpdateUserProfileResponse> => {
  return apiClient<UpdateUserProfileResponse>("update-me", { method: "PATCH", data, headers: { "Content-Type": "multipart/form-data" } });
};
