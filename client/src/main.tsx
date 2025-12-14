import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/themeContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vespera-ui-theme">
        <ToastContainer />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
