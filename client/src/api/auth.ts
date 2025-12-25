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
} from "@/types/auth";
import { apiClient } from "@/utils/apiClient";

export const loginUser = async (data: LoginFormInputs): Promise<LoginSuccessResponse> => {
  return apiClient<LoginSuccessResponse>("users/login", { method: "POST", data });
};

export const singupUser = async (data: SingupFormInputs): Promise<SignupSuccessResponse> => {
  return apiClient<SignupSuccessResponse>("users/signup", { method: "POST", data });
};

export const logoutUser = async (): Promise<LogoutSuccessResponse> => {
  return apiClient<LogoutSuccessResponse>("users/logout", { method: "GET" });
};

export const sendEmailForgetPassword = async (data: SendEmailForgetPasswordFormInputs): Promise<SendEmailForgetPasswordResponse> => {
  return apiClient<SendEmailForgetPasswordResponse>("users/forgot-password", { method: "POST", data });
};

export const resetPassword = async (data: ResetPasswordFormInputs): Promise<ResetPasswordResponse> => {
  return apiClient<ResetPasswordResponse>("users/reset-password", { method: "PATCH", data });
};
