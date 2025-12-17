import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { LoginSuccessResponse, SignupSuccessResponse } from "@/types/auth";
import type { UpdateUserProfileResponse, User } from "@/types/user";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: Boolean;
}

interface AuthActions {
  updateUser: (user: UpdateUserProfileResponse) => void;
  login: (payload: LoginSuccessResponse) => void;
  singup: (payload: SignupSuccessResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      updateUser: (payload) => {
        set({ user: payload.data });
      },

      login: (payload) => {
        set({
          token: payload.token,
          user: payload.data,
          isAuthenticated: true,
        });
      },

      singup: (payload) => {
        set({
          token: payload.token,
          user: payload.data,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      // Optional: Choose which part of the state to persist
      // We need to persist the token and user to restore the session
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),

      // Optional: Called when state is read from storage, use this to set isAuthenticated
      onRehydrateStorage: () => {
        return (state) => {
          // after the store load from localStorage, derive isAuthenticated
          if (state && state.token) {
            state.isAuthenticated = true;
          } else if (state) {
            state.isAuthenticated = false;
          }
        };
      },
    }
  )
);
