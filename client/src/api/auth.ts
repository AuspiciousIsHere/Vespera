import type {
  SignupSuccessResponse,
  LoginFormInputs,
  LoginSuccessResponse,
  SingupFormInputs,
  LogoutSuccessResponse,
  SendEmailForgetPasswordResponse,
  SendEmailForgetPasswordFormInputs,
  ResetPasswordResponse,
  ResetPasswordFormInputs,
  UpdatePasswordFormInputs,
  UpdatePasswordResponse,
} from "@/types/auth";
import { USER_URL } from "@/constant/constants";
import { apiClient } from "@/utils/apiClient";

export const loginUser = async (data: LoginFormInputs): Promise<LoginSuccessResponse> => {
  return apiClient<LoginSuccessResponse>(`${USER_URL}/login`, { method: "POST", data });
};

export const singupUser = async (data: SingupFormInputs): Promise<SignupSuccessResponse> => {
  return apiClient<SignupSuccessResponse>(`${USER_URL}/signup`, { method: "POST", data });
};

export const logoutUser = async (): Promise<LogoutSuccessResponse> => {
  return apiClient<LogoutSuccessResponse>(`${USER_URL}/logout`, { method: "GET" });
};

export const sendEmailForgetPassword = async (data: SendEmailForgetPasswordFormInputs): Promise<SendEmailForgetPasswordResponse> => {
  return apiClient<SendEmailForgetPasswordResponse>(`${USER_URL}/forgot-password`, { method: "POST", data });
};

export const resetPassword = async (data: ResetPasswordFormInputs): Promise<ResetPasswordResponse> => {
  return apiClient<ResetPasswordResponse>(`${USER_URL}/reset-password`, { method: "PATCH", data });
};

export const updateUserPassword = async (data: UpdatePasswordFormInputs): Promise<UpdatePasswordResponse> => {
  return apiClient<UpdatePasswordResponse>(`${USER_URL}/update-password`, { method: "POST", data });
};
