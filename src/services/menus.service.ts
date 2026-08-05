import api from "@/libs/axios";
import type { ApiPaginatedResponse } from "@/types/api";
import type { Menu } from "@/types/menu";

export const menuService = {
  // Ambil semua data menu dengan pagination
  list: async (
    page: number = 1,
    limit: number = 10,
    search: string,
  ): Promise<ApiPaginatedResponse<Menu>> => {
    const response = await api.get<ApiPaginatedResponse<Menu>>(
      `/menus?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },
};
