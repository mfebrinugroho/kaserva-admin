// import axios from "@/libs/axios";
import { api } from "@/libs/axios";
import { clearAccessToken, getAccessToken } from "@/libs/token-store";
import type { ApiResponse } from "@/types/api";

import type {
  LoginRequest,
  Register,
  LoginResponse,
  MeResponse,
} from "@/types/auth";
import { refresh } from "./authRefresh";

// REGISTER
export const register = async (
  payload: Register,
): Promise<ApiResponse<LoginResponse>> => {
  // await csrf();

  const response = await api.post("/register", payload);

  return response.data;
};

// LOGIN
export const login = async (
  payload: LoginRequest,
): Promise<ApiResponse<LoginResponse>> => {
  // await csrf();

  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload,
  );

  return response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  if (!getAccessToken()) {
    await refresh();
  }

  const response = await api.get<ApiResponse<MeResponse>>("/auth/me");

  return response.data.data;
};

// LOGOUT
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    clearAccessToken();
  }
};
