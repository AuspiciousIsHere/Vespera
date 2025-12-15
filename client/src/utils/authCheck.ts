import { redirect } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Utility function to be used as a loader in the protected routes.
// If the user is not authenticated (based on the Zustand store's initial state),
// it redirects them to the login page.

export function requireAuth() {
  // IMPORTANT: Since loaders run outside of React components,
  // we access the store's current state directly using the getState() method.
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    // React Router's 'redirect' function
    throw redirect("/login");
  }

  return null;
}
