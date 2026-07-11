import type { ApiPaginatedResponse, ApiResponse } from "@/types/api";
import api from "../libs/axios";
import type { User, UserForm } from "@/types/user";
import type { EditUserFormData } from "@/schemas/editUser.schema";

export const userService = {
  // Ambil semua data user dengan pagination
  list: async (
    page: number = 1,
    limit: number = 10,
    search: string,
  ): Promise<ApiPaginatedResponse<User>> => {
    const response = await api.get<ApiPaginatedResponse<User>>(
      `/users?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },

  // API Untuk menambah/create data user
  create: async (payload: UserForm): Promise<ApiResponse<User>> => {
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
    payload: EditUserFormData,
  ): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, payload);

    return response.data;
  },

  // Api untuk menghapus data user
  delete: async (id: number) => {
    const response = await api.delete(`/users/${id}`);

    return response.data;
  },
};
