"use client";

import { createContext, useEffect, useState } from "react";
import { User, AuthContextType, RegisterData } from "@/hooks/useAuth";
import axios from "axios";

export const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL", API_URL);

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token and validate it
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          // Set default authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Validate token and get user data
          //   const response = await axios.get(`${API_URL}/auth/me`)
          //   setUser(response.data.user)
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      // Store token
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setUser(user);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${API_URL}/auth/register`, userData);

      const { accessToken, user } = response.data;

      // Store token
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setUser(user);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred during registration"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Call logout endpoint
      await axios.post(`${API_URL}/auth/logout`);

      // Clear local storage and state
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred during logout"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            const response = await axios.post(`${API_URL}/auth/refresh-token`);
            const { accessToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            // Retry original request
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, logout user
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
