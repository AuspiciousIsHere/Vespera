import type { SignupSuccessResponse, LoginFormInputs, LoginSuccessResponse, SingupFormInputs, LogoutSuccessResponse } from "@/types/auth";
import { apiClient } from "@/utils/apiClient";

export const loginUser = async (data: LoginFormInputs): Promise<LoginSuccessResponse> => {
  return apiClient<LoginSuccessResponse>("/login", { method: "POST", data });
};

export const singupUser = async (data: SingupFormInputs): Promise<SignupSuccessResponse> => {
  return apiClient<SignupSuccessResponse>("/signup", { method: "POST", data });
};

export const logoutUser = async (): Promise<LogoutSuccessResponse> => {
  return apiClient<LogoutSuccessResponse>("/logout", { method: "GET" });
};
