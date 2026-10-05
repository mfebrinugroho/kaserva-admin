import type { ApiPaginatedResponse, ApiResponse } from "@/types/api";
import { api } from "../libs/axios";
import type { Store, StoreOperatingHour, StoreOption } from "@/types/store";
import type { StoreFormOutput } from "@/schemas/store.schema";
import type { UpdateStoreFormData } from "@/schemas/updateStore.schema";
import type { User } from "@/types/user";
import type { AddOwnerFormOutput } from "@/schemas/addOwner.schema";

interface StoreQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface UpdateStoreOperatingHoursPayload {
  operating_hours: {
    day_of_week: number;
    is_open: boolean;
    open_time: string | null;
    close_time: string | null;
  }[];
}

export const storeService = {
  // Ambil semua data user dengan pagination
  list: async ({
    page = 1,
    limit = 10,
    search = "",
  }: StoreQueryParams): Promise<ApiPaginatedResponse<Store>> => {
    const response = await api.get<ApiPaginatedResponse<Store>>(
      `/stores?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  },

  // API Untuk menambah/create data store
  create: async (payload: StoreFormOutput): Promise<ApiResponse<Store>> => {
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
    payload: UpdateStoreFormData,
  ): Promise<ApiResponse<Store>> => {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("name", payload.name);
    formData.append("description", payload.description ?? "");
    formData.append("address", payload.address ?? "");
    formData.append("phone", payload.phone ?? "");

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

  updateStatusOperational: async ({
    id,
    is_open,
  }: {
    id: number;
    is_open: boolean;
  }): Promise<ApiResponse<Store>> => {
    const response = await api.patch<ApiResponse<Store>>(
      `/stores/${id}/status-operational`,
      {
        is_open,
      },
    );

    return response.data;
  },

  updateStatusOrder: async ({
    id,
    is_accept_order,
  }: {
    id: number;
    is_accept_order: boolean;
  }): Promise<ApiResponse<Store>> => {
    const response = await api.patch<ApiResponse<Store>>(
      `/stores/${id}/status-order`,
      {
        is_accept_order,
      },
    );

    return response.data;
  },

  // Api untuk menghapus data resto/toko
  delete: async (id: number) => {
    const response = await api.delete(`/stores/${id}`);

    return response.data;
  },

  addOwner: async (
    payload: AddOwnerFormOutput,
  ): Promise<ApiResponse<Store>> => {
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

  options: async (): Promise<ApiResponse<StoreOption[]>> => {
    const response =
      await api.get<ApiResponse<StoreOption[]>>(`/stores/options`);

    return response.data;
  },

  operatingHours: async ({
    storeId,
  }: {
    storeId: number;
  }): Promise<ApiResponse<StoreOperatingHour[]>> => {
    const response = await api.get<ApiResponse<StoreOperatingHour[]>>(
      `/stores/${storeId}/operating-hours`,
    );

    return response.data;
  },

  updateOperatingHours: async ({
    id,
    data,
  }: {
    id: number;
    data: UpdateStoreOperatingHoursPayload;
  }): Promise<ApiResponse<StoreOperatingHour[]>> => {
    const response = await api.put<ApiResponse<StoreOperatingHour[]>>(
      `/stores/${id}/operating-hours`,
      data,
    );

    return response.data;
  },
};
