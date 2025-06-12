import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type LoginMethod = 'telegram' | 'google' | null;

const useAuthStore = create((set: any) => {
  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const loginMethod =
    typeof window !== "undefined" ? localStorage.getItem("login_method") as LoginMethod : null;

  return {
    isAuthenticated: !!isLoggedIn,
    loginMethod: loginMethod,

    login: (method: LoginMethod = 'telegram') => {
      localStorage.setItem("auth_token", "true");
      localStorage.setItem("login_method", method);
      set({ isAuthenticated: true, loginMethod: method });
    },

    logout: () => {
      localStorage.setItem("auth_token", "false");
      localStorage.removeItem("login_method");
      set({ isAuthenticated: false, loginMethod: null });
    },
  };
});

export const useAuth = () => {
  const { isAuthenticated, loginMethod, login, logout } =
    useAuthStore();

  return { isAuthenticated, loginMethod, login, logout };
};
