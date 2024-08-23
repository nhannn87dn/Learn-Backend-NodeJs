import { create } from "zustand";
import { axiosClient } from "../lib/axiosClient";
import { devtools } from 'zustand/middleware'


interface User {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
}

interface Auth {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ isAuthenticated: boolean; error: string }>;
  logout: () => void;
}

const useAuth = create(
  devtools<Auth>((set) => ({
    user: null,
    setUser: (user: User) => {
      set({ user });
    },
    isAuthenticated: false,
    login: async (email: string, password: string) => {
      try {
        const response = await axiosClient.post(
          "http://localhost:8080/api/v1/auth/login",
          { email, password }
        );

        if (response && response.data.statusCode === 200) {
          const isAuthenticated = true;
          const responseProfile = await axiosClient.get(
            "http://localhost:8080/api/v1/auth/profile"
          );

          set({ user: responseProfile.data.data, isAuthenticated });
          return { isAuthenticated, error: "" };
        } else {
          return {
            isAuthenticated: false,
            error: "Username or password is invalid",
          };
        }
      } catch (error) {
        return {
          isAuthenticated: false,
          error: error?.message || "Login failed",
        };
      }
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  }))
);

export default useAuth;