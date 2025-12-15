import { toast } from "react-toastify";
import type { ApiErrorResponse } from "@/types/auth";

/**
 * Custom hook to centralize error parsing and notification display.
 * @returns A function that takes a raw error object and displays a toast notification.
 */
export const useToastErrorHandler = () => {
  const handleError = (error: unknown) => {
    // 1. Set a sensible default message for unexpected errors
    let errorMessage = "An unexpected error occurred. Please try again later.";

    // Ensure we are working with an Error object, which React Query guarantees
    if (error instanceof Error) {
      const rawErrorMessage = error.message;

      try {
        // Attempt 1: Parse the error message if it's a JSON string (from server)
        const serverError = JSON.parse(rawErrorMessage) as ApiErrorResponse;

        if (serverError.message) {
          // Use the specific message from the server response
          errorMessage = serverError.message;
        } else if (serverError.code) {
          // Fallback to a code if message isn't present
          errorMessage = `Server Error: ${serverError.code}`;
        }
      } catch (e) {
        // Attempt 2: Handle non-JSON errors (e.g., pure network failures)
        if (rawErrorMessage.includes("No response received")) {
          errorMessage = "Network error: Could not connect to the server.";
        } else if (rawErrorMessage.length > 0) {
          // Use the raw message if it's not a generic unhelpful one
          errorMessage = rawErrorMessage;
        }
      }
    }

    // 2. Display the determined error message
    toast.error(errorMessage);
  };

  return { handleError };
};
