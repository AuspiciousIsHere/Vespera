import type {
  DeleteUserAccountResponse,
  DeleteUsersResponse,
  GetAllUsersResponse,
  HandleLoginNotifResponse,
  UpdateUserProfileFormInputs,
  UpdateUserProfileResponse,
} from "@/types/user";
import { USER_URL } from "@/constant/constants";
import { apiClient } from "@/utils/apiClient";

export const updateUserProfile = async (data: UpdateUserProfileFormInputs | FormData): Promise<UpdateUserProfileResponse> => {
  return apiClient<UpdateUserProfileResponse>(`${USER_URL}/update-me`, { method: "PATCH", data, headers: { "Content-Type": "multipart/form-data" } });
};

export const getAllUsers = async (params: Record<string, any>): Promise<GetAllUsersResponse> => {
  const queryString = new URLSearchParams(params).toString();
  return apiClient<GetAllUsersResponse>(`${USER_URL}/?${queryString}`, { method: "GET" });
};

export const deleteAccount = async (): Promise<DeleteUserAccountResponse> => {
  return apiClient<DeleteUserAccountResponse>(`${USER_URL}/delete-account`, { method: "DELETE" });
};

export const handleLoginNotif = async (): Promise<HandleLoginNotifResponse> => {
  return apiClient<HandleLoginNotifResponse>(`${USER_URL}/login-notif`, { method: "POST" });
};

export const deleteUsers = async (userIDs: string[]): Promise<DeleteUsersResponse> => {
  return apiClient<DeleteUsersResponse>(`${USER_URL}`, { method: "DELETE", data: userIDs });
};
