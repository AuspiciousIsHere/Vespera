import type { User } from "./user";

// Login
export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
  data: User;
}

// Signup
export interface SingupFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupSuccessResponse {
  token: string;
  data: User;
}

// Logout
export interface LogoutSuccessResponse {
  message: string;
}

// Error
export interface ApiErrorResponse {
  message: string;
  status?: number;
  code?: string;
}
