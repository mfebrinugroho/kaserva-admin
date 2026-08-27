import api from "@/libs/axios";
import type { ApiPaginatedResponse } from "@/types/api";
import type { Menu } from "@/types/menu";

interface MenusQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const menuService = {
  // Ambil semua data menu dengan pagination
  list: async ({
    page = 1,
    limit = 10,
    search = "",
  }: MenusQueryParams): Promise<ApiPaginatedResponse<Menu>> => {
    const response = await api.get<ApiPaginatedResponse<Menu>>(
      `/menus?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },
};
