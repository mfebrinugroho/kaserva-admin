// import axios from "@/libs/axios";
import api from "@/libs/axios";
import type { ApiResponse } from "@/types/api";

import type { Login, Register, AuthResponse, UserAuth } from "@/types/auth";

// GET CSRF COOKIE
// export const csrf = async () => {
//   await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`);
// };

// REGISTER
export const register = async (
  payload: Register,
): Promise<ApiResponse<AuthResponse>> => {
  // await csrf();

  const response = await api.post("/register", payload);

  return response.data;
};

// LOGIN
export const login = async (
  payload: Login,
): Promise<ApiResponse<AuthResponse>> => {
  // await csrf();

  const response = await api.post("/login", payload);

  return response.data;
};

// GET AUTH USER
export const getUser = async (): Promise<UserAuth> => {
  const response = await api.get("/user");

  return response.data.data;
};

// LOGOUT
export const logout = async () => {
  const response = await api.post("/logout");

  return response.data;
};
