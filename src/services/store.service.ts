import type { ApiPaginatedResponse, ApiResponse } from "@/types/api";
import api from "../libs/axios";
import type { Store } from "@/types/store";
import type { CreateStoreFormData } from "@/schemas/createStore.schema";
import type { EditStoreFormData } from "@/schemas/editStore.schema";
import type { User } from "@/types/user";
import type { AddOwnerFormData } from "@/schemas/addOwner.schema";

export const storeService = {
  // Ambil semua data user dengan pagination
  list: async (
    page: number = 1,
    limit: number = 10,
    search: string,
  ): Promise<ApiPaginatedResponse<Store>> => {
    const response = await api.get<ApiPaginatedResponse<Store>>(
      `/stores?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },

  // API Untuk menambah/create data store
  create: async (payload: CreateStoreFormData): Promise<ApiResponse<Store>> => {
    const response = await api.post<ApiResponse<Store>>("/stores", payload);

    return response.data;
  },

  // Api untuk mengambil data store berdasarkan ID
  show: async (id: number): Promise<ApiResponse<Store>> => {
    const response = await api.get<ApiResponse<Store>>(`/stores/${id}`);

    return response.data;
  },

  // Api untuk mengupdate data store
  update: async (
    id: number,
    payload: EditStoreFormData,
  ): Promise<ApiResponse<Store>> => {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("address", payload.address);
    formData.append("phone", payload.phone);

    if (payload.image) {
      formData.append("image", payload.image);
    }

    if (payload.banner) {
      formData.append("banner", payload.banner);
    }

    const response = await api.post<ApiResponse<Store>>(
      `/stores/${id}`,
      formData,
    );

    return response.data;
  },

  updateStatus: async ({
    id,
    is_active,
  }: {
    id: number;
    is_active: boolean;
  }): Promise<ApiResponse<Store>> => {
    const response = await api.patch<ApiResponse<Store>>(
      `/stores/${id}/status`,
      {
        is_active,
      },
    );

    return response.data;
  },

  // Api untuk menghapus data resto/toko
  delete: async (id: number) => {
    const response = await api.delete(`/stores/${id}`);

    return response.data;
  },

  addOwner: async (payload: AddOwnerFormData): Promise<ApiResponse<Store>> => {
    const response = await api.post<ApiResponse<Store>>(
      "/stores/store-owner",
      payload,
    );

    return response.data;
  },

  availableOwners: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>(
      `/stores-owners/available-users`,
    );

    return response.data;
  },

  availableStores: async (): Promise<ApiResponse<Store[]>> => {
    const response = await api.get<ApiResponse<Store[]>>(
      `/stores-owners/available-stores`,
    );

    return response.data;
  },
};
