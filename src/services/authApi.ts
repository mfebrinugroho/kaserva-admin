import axios from "@/libs/axios";
import api from "@/libs/axios";

import type {
  Login,
  Register,
  AuthResponse,
  User,
  UserAuth,
} from "@/types/auth";

// GET CSRF COOKIE
export const csrf = async () => {
  await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
};

// REGISTER
export const register = async (
  payload: Register,
): Promise<AuthResponse<User>> => {
  await csrf();

  const response = await api.post("/register", payload);

  return response.data;
};

// LOGIN
export const login = async (payload: Login): Promise<AuthResponse<User>> => {
  await csrf();

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
