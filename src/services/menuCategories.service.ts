import api from "@/libs/axios";
import type { MenuCategoryFormOutput } from "@/schemas/menuCategory.schema";
import type { ApiPaginatedResponse, ApiResponse } from "@/types/api";
import type { MenuCategory } from "@/types/menuCategory";

interface MenuCategoriesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const menuCategoriesService = {
  // Ambil semua data kategori menu dengan pagination
  list: async ({
    page = 1,
    limit = 10,
    search = "",
  }: MenuCategoriesQueryParams): Promise<
    ApiPaginatedResponse<MenuCategory>
  > => {
    const response = await api.get<ApiPaginatedResponse<MenuCategory>>(
      `/menu-categories?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },

  create: async (
    payload: MenuCategoryFormOutput,
  ): Promise<ApiResponse<MenuCategory>> => {
    const response = await api.post<ApiResponse<MenuCategory>>(
      "/menu-categories",
      payload,
    );

    return response.data;
  },

  update: async (
    id: number,
    payload: MenuCategoryFormOutput,
  ): Promise<ApiResponse<MenuCategory>> => {
    const response = await api.put<ApiResponse<MenuCategory>>(
      `/menu-categories/${id}`,
      payload,
    );

    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/menu-categories/${id}`);

    return response.data;
  },
};
