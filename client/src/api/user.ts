import type { GetAllUsersResponse, UpdateUserProfileFormInputs, UpdateUserProfileResponse } from "@/types/user";
import { apiClient } from "@/utils/apiClient";

const USER_URL = "/users";

export const updateUserProfile = async (data: UpdateUserProfileFormInputs | FormData): Promise<UpdateUserProfileResponse> => {
  return apiClient<UpdateUserProfileResponse>(`${USER_URL}/update-me`, { method: "PATCH", data, headers: { "Content-Type": "multipart/form-data" } });
};

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  return apiClient<GetAllUsersResponse>(`${USER_URL}`, { method: "GET" });
};
