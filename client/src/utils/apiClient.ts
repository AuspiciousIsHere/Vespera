import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

import { useAuthStore } from "@/store/authStore";
import { ENDPOINT } from "@/constant/constants";

// Optional: Create a centralized Axios instance
const axiosClient = axios.create({
  baseURL: `${ENDPOINT}/api/v1`, // Set a base URL once
  headers: {
    "Content-Type": "application/json",
    // ... potentially add Authorization header here via interceptor (see bonus)
  },
});

/**
 * REQUEST INTERCEPTOR
 * This runs BEFORE every request is sent to the server.
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Access the token from your Zustand store
    const token = useAuthStore.getState().token;

    // If token exists and headers exist, attach the Authorization header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR (Bonus)
 * Useful for handling global errors like 401 Unauthorized (Token expired)
 */
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logic for token expiration:
      // e.g., Logout the user if the token is no longer valid
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

/**
 * A generic, centralized function using Axios to handle fetching and structured errors.
 *
 * @param url The endpoint URL (will be appended to baseURL if set).
 * @param config The Axios request configuration.
 * @returns A Promise that resolves to the parsed JSON data (T).
 */
export async function apiClient<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
  try {
    // Axios handles:
    // 1. JSON stringifying the data object.
    // 2. Setting 'Content-Type': 'application/json'.
    const response: AxiosResponse<T> = await axiosClient(url, config);

    // Axios automatically rejects the Promise for 4xx/5xx status codes,
    // so if we reach this point, the request was successful (2xx).
    // The response.data is already parsed into type T.
    return response.data;
  } catch (error) {
    // Axios catches the rejection (4xx, 5xx, or network errors) here.
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx (e.g., 401, 404, 500).

      // We throw the server's error response message or a structured object.
      // This is what React Query's onError handler will receive.
      console.error(error);
      throw axiosError.response.data || axiosError.response.statusText;
    } else if (axiosError.request) {
      // The request was made but no response was received (e.g., network timeout)
      console.error(error);
      throw new Error("No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(error);
      throw new Error("Request setup failed.");
    }
  }
}
