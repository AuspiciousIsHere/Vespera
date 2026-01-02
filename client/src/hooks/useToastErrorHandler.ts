import type { CustomBackendError } from "@/types/auth";
import { toast } from "react-toastify";

/**
 * Custom hook to centralize error parsing and notification display.
 * @returns A function that takes a raw error object and displays a toast notification.
 */

function isBackendError(error: any): error is CustomBackendError {
  return error !== null && typeof error === "object" && "status" in error && "message" in error && typeof error.message === "string";
}

export const useToastErrorHandler = () => {
  const handleError = (error: unknown) => {
    // 1. Set a sensible default message for unexpected errors
    let errorMessage = "An unexpected error occurred. Please try again later.";

    if (isBackendError(error)) {
      errorMessage = error.message;
    }
    // 2. Check for standard JavaScript Errors (Network failure, syntax errors, etc.)
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
    // 3. Check for raw string errors
    else if (typeof error === "string") {
      errorMessage = error;
    }
    // 4. Display the determined error message
    toast.error(errorMessage);
  };

  return { handleError };
};
