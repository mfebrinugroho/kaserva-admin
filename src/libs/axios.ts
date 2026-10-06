import axios, { type InternalAxiosRequestConfig } from "axios";
import { refresh } from "@/services/authRefresh";
import { clearAccessToken, getAccessToken } from "./token-store";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/staff`,
  withCredentials: true,
});

export const apiRefresh = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/staff`,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refresh();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
