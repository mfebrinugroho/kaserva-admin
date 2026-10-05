import type { ApiPaginatedResponse, ApiResponse } from "@/types/api";
import { api } from "../libs/axios";
import type { User } from "@/types/user";
import type { UpdateUserFormOutput } from "@/schemas/updateUser.schema";
import type { MeResponse } from "@/types/auth";
import type { UserFormOutput } from "@/schemas/user.schema";

interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const userService = {
  // Ambil semua data user dengan pagination
  list: async ({
    page = 1,
    limit = 10,
    search = "",
  }: UserQueryParams): Promise<ApiPaginatedResponse<User>> => {
    const response = await api.get<ApiPaginatedResponse<User>>(
      `/users?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },

  // API Untuk menambah/create data user
  create: async (payload: UserFormOutput): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>("/users", payload);

    return response.data;
  },

  // Api untuk mengambil data user berdasarkan ID
  show: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);

    return response.data;
  },

  // Api untuk mengupdate data user
  update: async (
    id: number,
    payload: UpdateUserFormOutput,
  ): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, payload);

    return response.data;
  },

  // Api untuk menghapus data user
  delete: async (id: number) => {
    const response = await api.delete(`/users/${id}`);

    return response.data;
  },

  updateActiveStore: async (id: number): Promise<ApiResponse<MeResponse>> => {
    const response = await api.post<ApiResponse<MeResponse>>(
      `/user/active-store`,
      {
        store_id: id,
      },
    );

    return response.data;
  },
};
