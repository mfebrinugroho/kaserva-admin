import type { ApiResponse } from "@/types/api";
import type { Role } from "@/types/role";
import { api } from "../libs/axios";

export const roleService = {
  list: async (): Promise<ApiResponse<Role[]>> => {
    const response = await api.get<ApiResponse<Role[]>>(`/roles`);

    return response.data;
  },
};
