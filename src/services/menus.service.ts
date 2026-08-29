import api from "@/libs/axios";
import type { MenuFormOutput } from "@/schemas/menu.schema";
import type { ApiPaginatedResponse, ApiResponse } from "@/types/api";
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

  // API Untuk menambah/create data store
  create: async (payload: MenuFormOutput): Promise<ApiResponse<Menu>> => {
    const response = await api.post<ApiResponse<Menu>>("/menus", payload);

    return response.data;
  },

  // Api untuk mengambil data store berdasarkan ID
  show: async (id: number): Promise<ApiResponse<Menu>> => {
    const response = await api.get<ApiResponse<Menu>>(`/menus/${id}`);

    return response.data;
  },

  // Api untuk mengupdate data store
  update: async (
    id: number,
    payload: MenuFormOutput,
  ): Promise<ApiResponse<Menu>> => {
    // const formData = new FormData();

    // formData.append("_method", "PUT");
    // formData.append("store_id", payload.store_id);
    // formData.append("menu_category_id", payload.menu_category_id);
    // formData.append("name", payload.name);
    // formData.append("description", payload.description ?? "");
    // formData.append("price", payload.price);
    // formData.append("sort_order", payload.sort_order);
    // formData.append("is_available", payload.is_available);

    // if (payload.image) {
    //   formData.append("image", payload.image);
    // }

    const response = await api.put<ApiResponse<Menu>>(`/menus/${id}`, payload);

    return response.data;
  },

  updateStatus: async ({
    id,
    is_available,
  }: {
    id: number;
    is_available: boolean;
  }): Promise<ApiResponse<Menu>> => {
    const response = await api.patch<ApiResponse<Menu>>(
      `/menus/${id}/status-available`,
      {
        is_available,
      },
    );

    return response.data;
  },

  // Api untuk menghapus data resto/toko
  delete: async (id: number) => {
    const response = await api.delete(`/menus/${id}`);

    return response.data;
  },
};
